export interface TopPage {
  path: string;
  views: number;
}

export interface TopReferrer {
  source: string;
  sessions: number;
}

export interface TimeSeriesPoint {
  date: string;   // e.g. "Dec 1"
  views: number;
  sessions: number;
}

export interface DeviceBreakdown {
  device: string;
  sessions: number;
}

export interface TopCountry {
  country: string;
  sessions: number;
}

export interface AnalyticsData {
  // Totals
  pageViews: number;
  activeUsers: number;
  sessions: number;
  newUsers: number;
  bounceRate: number;        // 0–100
  avgSessionDuration: number; // seconds
  // Breakdowns
  timeSeries: TimeSeriesPoint[];
  deviceBreakdown: DeviceBreakdown[];
  topCountries: TopCountry[];
  topPages: TopPage[];
  topReferrers: TopReferrer[];
  fetchedAt: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// JWT helpers (RS256 via Web Crypto)
// ---------------------------------------------------------------------------

function pemToDer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function b64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function buildServiceAccountJwt(
  clientEmail: string,
  privateKeyPem: string,
  scope: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(
    new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  );
  const payload = b64url(
    new TextEncoder().encode(
      JSON.stringify({
        iss: clientEmail,
        scope,
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 3600,
      })
    )
  );

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToDer(privateKeyPem),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sigBuf = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(`${header}.${payload}`)
  );

  return `${header}.${payload}.${b64url(sigBuf)}`;
}

async function getAccessToken(
  clientEmail: string,
  privateKeyPem: string
): Promise<string> {
  const jwt = await buildServiceAccountJwt(
    clientEmail,
    privateKeyPem,
    "https://www.googleapis.com/auth/analytics.readonly"
  );

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${text}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

// ---------------------------------------------------------------------------
// GA4 Data API
// ---------------------------------------------------------------------------

type GA4Row = {
  dimensionValues?: { value: string }[];
  metricValues: { value: string }[];
};

type GA4Report = { rows?: GA4Row[] };

async function runReport(
  accessToken: string,
  propertyId: string,
  body: object
): Promise<GA4Report> {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GA4 report failed: ${text}`);
  }

  return res.json();
}

function dateRange() {
  return [{ startDate: "30daysAgo", endDate: "today" }];
}

/** Convert GA4 YYYYMMDD to "Dec 1" */
function formatGA4Date(raw: string): string {
  const year = parseInt(raw.slice(0, 4), 10);
  const month = parseInt(raw.slice(4, 6), 10) - 1;
  const day = parseInt(raw.slice(6, 8), 10);
  return new Date(year, month, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const EMPTY: AnalyticsData = {
  pageViews: 0,
  activeUsers: 0,
  sessions: 0,
  newUsers: 0,
  bounceRate: 0,
  avgSessionDuration: 0,
  timeSeries: [],
  deviceBreakdown: [],
  topCountries: [],
  topPages: [],
  topReferrers: [],
  fetchedAt: new Date().toISOString(),
};

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export async function fetchGA4Data(): Promise<AnalyticsData> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const propertyId = process.env.GA4_PROPERTY_ID;

  if (!clientEmail || !privateKey || !propertyId) {
    return {
      ...EMPTY,
      error:
        "Analytics not configured — set GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and GA4_PROPERTY_ID.",
    };
  }

  try {
    const accessToken = await getAccessToken(clientEmail, privateKey);

    const [totalsRes, timeSeriesRes, pagesRes, referrersRes, devicesRes, countriesRes] =
      await Promise.all([
        // Overall totals
        runReport(accessToken, propertyId, {
          dateRanges: dateRange(),
          metrics: [
            { name: "screenPageViews" },
            { name: "activeUsers" },
            { name: "sessions" },
            { name: "newUsers" },
            { name: "bounceRate" },
            { name: "averageSessionDuration" },
          ],
        }),
        // Daily time series
        runReport(accessToken, propertyId, {
          dateRanges: dateRange(),
          dimensions: [{ name: "date" }],
          metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
          orderBys: [{ dimension: { dimensionName: "date" } }],
        }),
        // Top pages
        runReport(accessToken, propertyId, {
          dateRanges: dateRange(),
          dimensions: [{ name: "pagePath" }],
          metrics: [{ name: "screenPageViews" }],
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 8,
        }),
        // Top referrers
        runReport(accessToken, propertyId, {
          dateRanges: dateRange(),
          dimensions: [{ name: "sessionSource" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 8,
        }),
        // Device breakdown
        runReport(accessToken, propertyId, {
          dateRanges: dateRange(),
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        }),
        // Top countries
        runReport(accessToken, propertyId, {
          dateRanges: dateRange(),
          dimensions: [{ name: "country" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 5,
        }),
      ]);

    // --- Totals ---
    const totalsRow = totalsRes.rows?.[0]?.metricValues ?? [];
    const pageViews = parseInt(totalsRow[0]?.value ?? "0", 10);
    const activeUsers = parseInt(totalsRow[1]?.value ?? "0", 10);
    const sessions = parseInt(totalsRow[2]?.value ?? "0", 10);
    const newUsers = parseInt(totalsRow[3]?.value ?? "0", 10);
    const bounceRate = Math.round(parseFloat(totalsRow[4]?.value ?? "0") * 100);
    const avgSessionDuration = Math.round(parseFloat(totalsRow[5]?.value ?? "0"));

    // --- Time series ---
    const timeSeries: TimeSeriesPoint[] = (timeSeriesRes.rows ?? []).map((row) => ({
      date: formatGA4Date(row.dimensionValues?.[0]?.value ?? ""),
      views: parseInt(row.metricValues[0]?.value ?? "0", 10),
      sessions: parseInt(row.metricValues[1]?.value ?? "0", 10),
    }));

    // --- Top pages ---
    const topPages: TopPage[] = (pagesRes.rows ?? []).map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? "/",
      views: parseInt(row.metricValues[0]?.value ?? "0", 10),
    }));

    // --- Top referrers ---
    const topReferrers: TopReferrer[] = (referrersRes.rows ?? [])
      .filter((row) => {
        const src = row.dimensionValues?.[0]?.value ?? "";
        return src !== "(direct)" && src !== "(not set)";
      })
      .slice(0, 5)
      .map((row) => ({
        source: row.dimensionValues?.[0]?.value ?? "unknown",
        sessions: parseInt(row.metricValues[0]?.value ?? "0", 10),
      }));

    // --- Device breakdown ---
    const deviceBreakdown: DeviceBreakdown[] = (devicesRes.rows ?? []).map((row) => ({
      device:
        (row.dimensionValues?.[0]?.value ?? "other").charAt(0).toUpperCase() +
        (row.dimensionValues?.[0]?.value ?? "other").slice(1),
      sessions: parseInt(row.metricValues[0]?.value ?? "0", 10),
    }));

    // --- Top countries ---
    const topCountries: TopCountry[] = (countriesRes.rows ?? []).map((row) => ({
      country: row.dimensionValues?.[0]?.value ?? "Unknown",
      sessions: parseInt(row.metricValues[0]?.value ?? "0", 10),
    }));

    return {
      pageViews,
      activeUsers,
      sessions,
      newUsers,
      bounceRate,
      avgSessionDuration,
      timeSeries,
      deviceBreakdown,
      topCountries,
      topPages,
      topReferrers,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[ga4] fetchGA4Data error:", err);
    return {
      ...EMPTY,
      fetchedAt: new Date().toISOString(),
      error: err instanceof Error ? err.message : "Unknown error fetching analytics.",
    };
  }
}
