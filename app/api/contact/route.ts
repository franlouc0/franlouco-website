import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "francisco.guerra.lourenco@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const FROM_NAME = process.env.RESEND_FROM_NAME ?? "Francisco Lourenço";
const SUBJECT_PREFIX = process.env.CONTACT_SUBJECT_PREFIX ?? "[franlou.co] Contact from";

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email is not configured (RESEND_API_KEY missing)." },
      { status: 500 }
    );
  }

  let body: { inquiryType?: string[]; name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { inquiryType = [], name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const inquiryLabel = Array.isArray(inquiryType) && inquiryType.length > 0
    ? inquiryType.join(", ")
    : "Not specified";

  const html = `
    <p><strong>Inquiry type:</strong> ${inquiryLabel}</p>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <pre>${escapeHtml(message)}</pre>
  `;

  const from = FROM_NAME ? `"${FROM_NAME.replace(/"/g, '\\"')}" <${FROM_EMAIL}>` : FROM_EMAIL;
  const replyTo = `"${name.trim().replace(/"/g, '\\"')}" <${email.trim()}>`;

  const { data, error } = await resend.emails.send({
    from,
    to: CONTACT_EMAIL,
    replyTo,
    subject: `${SUBJECT_PREFIX}: ${escapeHtml(name)}`,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: error.message ?? "Failed to send email." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, id: data?.id });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
