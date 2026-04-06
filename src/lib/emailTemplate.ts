function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
}

interface ContactEmailData {
  fullName: string;
  email: string;
  contactNumber?: string;
  message: string;
}

function field(label: string, value: string, isLink?: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td style="padding:16px 20px;background:#f9fafb;border-left:4px solid #F0C400;">
          <p style="margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6b7280;font-family:Arial,sans-serif;">
            ${label}
          </p>
          <p style="margin:0;font-size:15px;color:#111827;font-family:Arial,sans-serif;line-height:1.5;">
            ${isLink ? `<a href="${isLink}" style="color:#2650A8;text-decoration:none;">${value}</a>` : value}
          </p>
        </td>
      </tr>
    </table>`;
}

export function buildContactEmail(data: ContactEmailData): string {
  const { fullName, email, contactNumber, message } = data;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acbc-website.vercel.app";
  const firstName = fullName.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- ── Card ── -->
        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- ── Header ── -->
          <tr>
            <td style="background:#1A3A78;padding:40px 40px 32px;text-align:center;">
              <img
                src="${siteUrl}/images/logo.png"
                alt="ACBC Logo"
                width="80"
                height="80"
                style="border-radius:50%;display:block;margin:0 auto 20px;border:3px solid #F0C400;"
              />
              <h1 style="margin:0 0 4px;color:#ffffff;font-size:20px;font-weight:700;font-family:Georgia,serif;letter-spacing:-0.3px;">
                Anchored in Christ Baptist Camp
              </h1>
              <p style="margin:0 0 16px;color:#F0C400;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">
                New Contact Form Submission
              </p>
              <!-- Gold rule -->
              <div style="width:48px;height:2px;background:#F0C400;margin:0 auto;"></div>
            </td>
          </tr>

          <!-- ── Intro banner ── -->
          <tr>
            <td style="background:#0D2050;padding:14px 40px;text-align:center;">
              <p style="margin:0;color:#d1d5db;font-size:13px;font-family:Arial,sans-serif;">
                Someone reached out via the ACBC website. Their details are below.
              </p>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Greeting -->
              <p style="margin:0 0 28px;color:#374151;font-size:15px;line-height:1.7;font-family:Arial,sans-serif;">
                Hello,<br><br>
                You have received a new message through the contact form on the ACBC website.
                Here are the details submitted:
              </p>

              ${field("Full Name", escapeHtml(fullName))}
              ${field("Email Address", escapeHtml(email), `mailto:${email}`)}
              ${contactNumber ? field("Contact Number", escapeHtml(contactNumber), `tel:${contactNumber}`) : ""}
              ${field("Message", escapeHtml(message))}

              <!-- Divider -->
              <div style="border-top:1px solid #e5e7eb;margin:28px 0;"></div>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a
                      href="mailto:${email}?subject=Re%3A Your message to ACBC"
                      style="display:inline-block;background:#1A3A78;color:#ffffff;text-decoration:none;padding:13px 36px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;border-radius:2px;"
                    >
                      Reply to ${escapeHtml(firstName)}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#0D2050;padding:28px 40px;text-align:center;">
              <!-- Gold rule -->
              <div style="width:40px;height:2px;background:#F0C400;margin:0 auto 16px;"></div>
              <p style="margin:0 0 4px;color:#F0C400;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">
                Anchored in Christ Baptist Camp
              </p>
              <p style="margin:0 0 10px;color:#9ca3af;font-size:12px;font-family:Arial,sans-serif;">
                Ligao City, Albay, Philippines &nbsp;·&nbsp; anchoredinchristbc@gmail.com
              </p>
              <p style="margin:0;color:#4b5563;font-size:11px;font-family:Arial,sans-serif;line-height:1.6;">
                This is an automated notification from the ACBC website contact form.<br>
                Please do not reply directly to this email — use the button above instead.
              </p>
            </td>
          </tr>

        </table>
        <!-- ── End Card ── -->

      </td>
    </tr>
  </table>
</body>
</html>`;
}
