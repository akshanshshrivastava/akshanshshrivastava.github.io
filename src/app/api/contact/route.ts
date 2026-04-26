import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.privateemail.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "support@kravvy.com",
    pass: process.env.SMTP_PASS || "PLACEHOLDER_SET_LATER",
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || "support@kravvy.com";

    // Send notification to support
    try {
      await transporter.sendMail({
        from: `"KRAVVY Contact Form" <${process.env.SMTP_USER || "support@kravvy.com"}>`,
        to: contactEmail,
        subject: `[Contact Form] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fafafa; padding: 30px; border-radius: 12px;">
            <h1 style="color: #ef4444; margin-bottom: 20px; font-size: 24px;">New Contact Form Submission</h1>
            <div style="background: #18181b; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 5px 0; color: #a1a1aa;"><strong style="color: #d4d4d8;">Name:</strong> ${escapeHtml(name)}</p>
              <p style="margin: 5px 0; color: #a1a1aa;"><strong style="color: #d4d4d8;">Email:</strong> ${escapeHtml(email)}</p>
              <p style="margin: 5px 0; color: #a1a1aa;"><strong style="color: #d4d4d8;">Subject:</strong> ${escapeHtml(subject)}</p>
            </div>
            <div style="background: #18181b; padding: 20px; border-radius: 8px;">
              <p style="color: #d4d4d8; margin-bottom: 10px;"><strong>Message:</strong></p>
              <p style="color: #a1a1aa; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
            </div>
            <p style="color: #52525b; font-size: 12px; margin-top: 20px; text-align: center;">
              KRAVVY — Own Your Vibe
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send support email:", emailErr);
      // Continue — still try to send acknowledgment and return success
    }

    // Send acknowledgment to sender
    try {
      await transporter.sendMail({
        from: `"KRAVVY" <${process.env.SMTP_USER || "support@kravvy.com"}>`,
        to: email,
        subject: `We got your message — KRAVVY`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fafafa; padding: 30px; border-radius: 12px;">
            <h1 style="color: #ef4444; margin-bottom: 10px; font-size: 28px; letter-spacing: -1px;">KRAVVY</h1>
            <p style="color: #a1a1aa; margin-bottom: 20px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Own Your Vibe</p>
            <div style="background: #18181b; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #d4d4d8; margin: 0; line-height: 1.6;">
                Hey <strong>${escapeHtml(name)}</strong>,<br><br>
                Thanks for reaching out! We've received your message and our team will get back to you within 24 hours.<br><br>
                In the meantime, feel free to browse our latest collection at <a href="https://kravvy.com" style="color: #ef4444; text-decoration: none;">kravvy.com</a>.
              </p>
            </div>
            <p style="color: #52525b; font-size: 12px; text-align: center;">
              © ${new Date().getFullYear()} KRAVVY. All rights reserved.
            </p>
          </div>
        `,
      });
    } catch (ackErr) {
      console.error("Failed to send acknowledgment email:", ackErr);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to process your message. Please try again later." },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
