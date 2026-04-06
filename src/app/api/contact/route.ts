import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildContactEmail } from "@/lib/emailTemplate";

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

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
