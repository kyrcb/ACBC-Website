import type { Metadata } from "next";
import {
  fetchGA4Data,
  type TopPage,
  type TopReferrer,
  type TopCountry,
  type TimeSeriesPoint,
  type DeviceBreakdown,
} from "@/lib/ga4";
import PageViewsChart from "@/components/admin/PageViewsChart";
import DeviceChart from "@/components/admin/DeviceChart";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | ACBC Admin",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmtDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-navy-700 border-t-2 border-gold-500 px-6 py-5">
      <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-2">
        {label}
      </p>
      <p className="font-serif text-3xl font-bold text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {sub && (
        <p className="font-sans text-xs text-gray-500 mt-1">{sub}</p>
      )}
    </div>
  );
}

function Bar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-1 bg-navy-600 w-full mt-1.5">
      <div className="h-1 bg-gold-500" style={{ width: `${pct}%` }} />
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-navy-700 border-t-2 border-gold-500 px-6 py-6">
      <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-5">
        {title}
      </p>
      {children}
    </div>
  );
}

function TopPagesTable({ rows }: { rows: TopPage[] }) {
  const max = rows[0]?.views ?? 1;
  return (
    <SectionCard title="Top Pages — Last 30 Days">
      {rows.length === 0 ? (
        <p className="font-sans text-sm text-gray-500">No data yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {rows.map((row) => (
            <li key={row.path}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-sans text-sm text-gray-200 truncate">
                  {row.path}
                </span>
                <span className="font-sans text-sm font-semibold text-white shrink-0">
                  {row.views.toLocaleString()}
                </span>
              </div>
              <Bar value={row.views} max={max} />
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

function TopReferrersTable({ rows }: { rows: TopReferrer[] }) {
  const max = rows[0]?.sessions ?? 1;
  return (
    <SectionCard title="Top Referrers — Last 30 Days">
      {rows.length === 0 ? (
        <p className="font-sans text-sm text-gray-500">No data yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {rows.map((row) => (
            <li key={row.source}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-sans text-sm text-gray-200 truncate">
                  {row.source}
                </span>
                <span className="font-sans text-sm font-semibold text-white shrink-0">
                  {row.sessions.toLocaleString()}
                </span>
              </div>
              <Bar value={row.sessions} max={max} />
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

function TopCountriesTable({ rows }: { rows: TopCountry[] }) {
  const max = rows[0]?.sessions ?? 1;
  return (
    <SectionCard title="Top Countries — Last 30 Days">
      {rows.length === 0 ? (
        <p className="font-sans text-sm text-gray-500">No data yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {rows.map((row) => (
            <li key={row.country}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-sans text-sm text-gray-200 truncate">
                  {row.country}
                </span>
                <span className="font-sans text-sm font-semibold text-white shrink-0">
                  {row.sessions.toLocaleString()}
                </span>
              </div>
              <Bar value={row.sessions} max={max} />
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

function TimeSeriesSection({ data }: { data: TimeSeriesPoint[] }) {
  return (
    <SectionCard title="Page Views & Sessions — Last 30 Days">
      <PageViewsChart data={data} />
    </SectionCard>
  );
}

function DeviceSection({ data }: { data: DeviceBreakdown[] }) {
  return (
    <SectionCard title="Device Breakdown — Last 30 Days">
      <DeviceChart data={data} />
    </SectionCard>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function AdminDashboard() {
  const data = await fetchGA4Data();

  const refreshedAt = new Date(data.fetchedAt).toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="mx-auto max-w-content px-6 py-10">
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-white">Dashboard</h1>
        <p className="font-sans text-xs text-gray-500 mt-1 uppercase tracking-widest">
          Site Analytics — Last 30 Days
        </p>
      </div>

      {/* Error banner */}
      {data.error && (
        <div className="mb-8 border border-amber-400/40 bg-amber-400/10 px-5 py-4">
          <p className="font-sans text-sm text-amber-300 font-semibold mb-1">
            Analytics Unavailable
          </p>
          <p className="font-sans text-xs text-amber-400/80 leading-relaxed">
            {data.error}
          </p>
        </div>
      )}

      {/* Primary stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <StatCard label="Page Views" value={data.pageViews} />
        <StatCard label="Unique Visitors" value={data.activeUsers} />
        <StatCard label="Sessions" value={data.sessions} />
        <StatCard label="New Users" value={data.newUsers} />
      </div>

      {/* Secondary stat cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          label="Bounce Rate"
          value={`${data.bounceRate}%`}
          sub="% of sessions with 1 page view"
        />
        <StatCard
          label="Avg. Session Duration"
          value={fmtDuration(data.avgSessionDuration)}
          sub="Average time per visit"
        />
      </div>

      {/* Time series chart — full width */}
      <div className="mb-4">
        <TimeSeriesSection data={data.timeSeries} />
      </div>

      {/* Device breakdown + Top countries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DeviceSection data={data.deviceBreakdown} />
        <TopCountriesTable rows={data.topCountries} />
      </div>

      {/* Top pages + Top referrers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <TopPagesTable rows={data.topPages} />
        <TopReferrersTable rows={data.topReferrers} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-navy-700 pt-5">
        <p className="font-sans text-xs text-gray-600">
          Data reflects activity up to ~24 hours ago &middot; Refreshed {refreshedAt} PHT
        </p>
        <a
          href="/admin"
          className="font-sans text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          Refresh &rarr;
        </a>
      </div>
    </div>
  );
}
