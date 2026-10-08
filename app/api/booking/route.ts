import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

// ── Validation helpers ──────────────────────────────────────────────
// Strip any HTML / script tags to prevent XSS
function sanitize(value: string): string {
  return value
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/['"`;\\]/g, "") // strip characters commonly used in SQL injection
    .trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  // Allows optional +, digits, spaces, dashes, parentheses — 7 to 20 chars
  return /^[+]?[\d\s\-()]{7,20}$/.test(phone);
}

// ── POST handler ────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = sanitize(body.name ?? "");
    const email = sanitize(body.email ?? "");
    const phone = sanitize(body.phone ?? "");
    const message = sanitize(body.message ?? "");

    // ── Field-level validation ──
    const errors: Record<string, string> = {};

    if (!name || name.length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }
    if (!email || !isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!phone || !isValidPhone(phone)) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (!message || message.length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return Response.json({ success: false, errors }, { status: 400 });
    }

    // ── Save to Supabase ──
    const { error: dbError } = await supabase.from("bookings").insert([
      {
        name,
        email,
        phone,
        message,
      },
    ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return Response.json(
        { success: false, errors: { form: `Failed to save booking: ${dbError.message} (${dbError.code})` } },
        { status: 500 }
      );
    }

    // ── Send email notification via Nodemailer / Gmail SMTP ──
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyEmail = process.env.NOTIFY_EMAIL; // the inbox that receives submissions

    if (smtpUser && smtpPass && notifyEmail) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Triple A Studios" <${smtpUser}>`,
          to: notifyEmail,
          subject: `New Booking Inquiry from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #ffffff; border-radius: 12px;">
              <h2 style="color: #C46497; margin-bottom: 24px;">New Booking Inquiry</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #222; color: #888; width: 120px;">Name</td>
                  <td style="padding: 12px; border-bottom: 1px solid #222; color: #fff;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #222; color: #888;">Email</td>
                  <td style="padding: 12px; border-bottom: 1px solid #222; color: #fff;"><a href="mailto:${email}" style="color: #C46497;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #222; color: #888;">Phone</td>
                  <td style="padding: 12px; border-bottom: 1px solid #222; color: #fff;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; color: #888; vertical-align: top;">Message</td>
                  <td style="padding: 12px; color: #fff;">${message}</td>
                </tr>
              </table>
              <p style="margin-top: 24px; font-size: 12px; color: #555;">Sent from Triple A Design Studios website</p>
            </div>
          `,
        });
      } catch (emailError) {
        // Log but don't fail the request — the booking is already saved
        console.error("Email send error:", emailError);
      }
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { success: false, errors: { form: "Invalid request." } },
      { status: 400 }
    );
  }
}
