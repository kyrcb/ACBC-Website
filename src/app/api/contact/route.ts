import { NextRequest, NextResponse } from "next/server";
import dns from "dns";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import nodemailer from "nodemailer";
import { buildContactEmail } from "@/lib/emailTemplate";

const dnsLookup = promisify(dns.lookup);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, contactNumber, message } = body;

    // Server-side validation
    if (
      !fullName?.trim() ||
      fullName.trim().length < 2 ||
      !email?.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !message?.trim() ||
      message.trim().length < 10
    ) {
      return NextResponse.json(
        { error: "Invalid form data." },
        { status: 400 }
      );
    }

    // Validate env vars are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.CONTACT_RECIPIENT) {
      console.error("[contact/route] Missing required environment variables.");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    // Resolve smtp.gmail.com to an IPv4 address explicitly — on Windows, Node.js
    // may pick an IPv6 address that gets refused even with family:4 in nodemailer.
    const { address: smtpHost } = await dnsLookup("smtp.gmail.com", { family: 4 });

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD.replace(/\s/g, ""),
      },
      tls: {
        servername: "smtp.gmail.com",
        rejectUnauthorized: false, // bypass proxy-injected cert chain errors
      },
    });

    // Embed the logo as a base64 data URI so it shows in all email clients
    const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
    const logoBase64 = fs.readFileSync(logoPath).toString("base64");
    const logoSrc = `data:image/png;base64,${logoBase64}`;

    await transporter.sendMail({
      from: `"ACBC Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECIPIENT,
      replyTo: email.trim(),
      subject: `New Message from ${fullName.trim()} — ACBC Contact Form`,
      html: buildContactEmail({
        fullName: fullName.trim(),
        email: email.trim(),
        contactNumber: contactNumber?.trim() || undefined,
        message: message.trim(),
        logoSrc,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] Failed to send email:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
