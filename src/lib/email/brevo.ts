const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

interface EmailPayload {
  sender: { name: string; email: string };
  to: { email: string; name?: string }[];
  replyTo?: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  textContent?: string;
}

async function sendEmail(payload: EmailPayload): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY is not configured");

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Brevo API error ${response.status}: ${error}`);
  }
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

export async function sendContactConfirmation(data: ContactFormData) {
  const senderName = process.env.EMAIL_SENDER_NAME ?? "Blackford";
  const senderEmail = process.env.EMAIL_SENDER_ADDRESS ?? "enquiries@blackford.com";

  await sendEmail({
    sender: { name: senderName, email: senderEmail },
    to: [{ email: data.email, name: data.name }],
    subject: "Your enquiry has been received — Blackford",
    htmlContent: confirmationEmailHtml(data),
    textContent: confirmationEmailText(data),
  });
}

export async function sendAdminNotification(data: ContactFormData) {
  const senderName = process.env.EMAIL_SENDER_NAME ?? "Blackford";
  const senderEmail = process.env.EMAIL_SENDER_ADDRESS ?? "enquiries@blackford.com";
  const adminEmail = process.env.EMAIL_ADMIN_ADDRESS ?? senderEmail;

  const categoryLabels: Record<string, string> = {
    "real-estate": "Real Estate",
    automobiles: "Automobiles",
    "luxury-goods": "Luxury Goods",
    timepieces: "Timepieces",
    other: "Other",
  };

  await sendEmail({
    sender: { name: senderName, email: senderEmail },
    to: [{ email: adminEmail, name: "Blackford Team" }],
    replyTo: { email: data.email, name: data.name },
    subject: `New enquiry — ${categoryLabels[data.category] ?? data.category} — ${data.name}`,
    htmlContent: adminEmailHtml(data, categoryLabels),
    textContent: adminEmailText(data, categoryLabels),
  });
}

function confirmationEmailHtml(data: ContactFormData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blackford — Enquiry Received</title>
</head>
<body style="margin:0;padding:0;background:#F6F1E9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F6F1E9;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #D4CEC6;max-width:560px;width:100%;">
          <tr>
            <td style="padding:48px 48px 32px;border-bottom:1px solid #EDE7DA;">
              <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#8B7355;font-weight:500;">Blackford</p>
              <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#4A4A4A;">Private Acquisitions</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 48px;">
              <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:28px;font-weight:400;color:#0A0A0A;line-height:1.2;">Your enquiry has been received.</h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4A4A4A;">Dear ${escapeHtml(data.name)},</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4A4A4A;">
                Thank you for reaching out to Blackford. A member of our team will review your enquiry and be in touch within one business day.
              </p>
              <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#4A4A4A;">
                All communications are handled with absolute discretion.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F6F1E9;border-left:2px solid #C4A882;margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8B7355;">Enquiry Summary</p>
                    <p style="margin:0 0 4px;font-size:13px;color:#1C1C1C;"><strong>Category:</strong> ${escapeHtml(data.category)}</p>
                    <p style="margin:0;font-size:13px;color:#1C1C1C;"><strong>Contact:</strong> ${escapeHtml(data.email)}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#4A4A4A;">
                Yours discreetly,<br>
                <strong style="color:#1C1C1C;">The Blackford Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 48px;border-top:1px solid #EDE7DA;">
              <p style="margin:0;font-size:11px;color:#8B7355;line-height:1.6;">
                This message was sent in response to an enquiry submitted via blackford.com.<br>
                If you did not make this enquiry, please disregard this message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function confirmationEmailText(data: ContactFormData): string {
  return `BLACKFORD — Private Acquisitions

Your enquiry has been received.

Dear ${data.name},

Thank you for reaching out to Blackford. A member of our team will review your enquiry and be in touch within one business day.

All communications are handled with absolute discretion.

Enquiry Summary
Category: ${data.category}
Contact: ${data.email}

Yours discreetly,
The Blackford Team

---
This message was sent in response to an enquiry submitted via blackford.com.
If you did not make this enquiry, please disregard this message.`;
}

function adminEmailHtml(data: ContactFormData, categoryLabels: Record<string, string>): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Enquiry — Blackford</title></head>
<body style="margin:0;padding:0;background:#F6F1E9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F6F1E9;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #D4CEC6;max-width:560px;width:100%;">
          <tr>
            <td style="padding:32px 48px;border-bottom:1px solid #EDE7DA;background:#0A0A0A;">
              <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#C4A882;">Blackford</p>
              <p style="margin:6px 0 0;font-size:13px;color:#8B7355;">New Enquiry Received</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${adminRow("Name", data.name)}
                ${adminRow("Email", data.email)}
                ${adminRow("Phone", data.phone || "—")}
                ${adminRow("Category", categoryLabels[data.category] ?? data.category)}
              </table>
              <p style="margin:24px 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8B7355;">Message</p>
              <p style="margin:0;padding:16px;background:#F6F1E9;font-size:14px;line-height:1.7;color:#1C1C1C;border-left:2px solid #C4A882;">${escapeHtml(data.message)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function adminRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8B7355;width:120px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;font-size:14px;color:#1C1C1C;">${escapeHtml(value)}</td>
  </tr>`;
}

function adminEmailText(data: ContactFormData, categoryLabels: Record<string, string>): string {
  return `BLACKFORD — New Enquiry

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "—"}
Category: ${categoryLabels[data.category] ?? data.category}

Message:
${data.message}`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
