import { Resend } from "resend";

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }
  return new Resend(apiKey);
};

export async function sendVerificationEmail(to, code, name) {
  const fromEmail = process.env.EMAIL_FROM;
  const fromName = process.env.EMAIL_FROM_NAME || "TutorLink";

  if (!fromEmail) {
    throw new Error("Missing EMAIL_FROM");
  }

  const subject = "Verify your TutorLink account";
  const textBody = `Hello ${name || "user"},\n\nYour TutorLink verification code is: ${code}\n\nThis code expires soon.\n\n— TutorLink`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a;">
      <h2 style="margin-bottom: 12px;">TutorLink Verification</h2>
      <p>Hello ${name || "user"},</p>
      <p>Your verification code is:</p>
      <div style="font-size: 32px; font-weight: 700; letter-spacing: 8px; margin: 20px 0;">${code}</div>
      <p>This code expires soon. Please enter it in the TutorLink app to continue.</p>
      <p style="margin-top: 20px; color: #475569;">— TutorLink</p>
    </div>
  `;

  try {
    const resend = getResendClient();
    const response = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (!response || response.error) {
      const errorMessage =
        response?.error?.message || "Resend rejected the email request";
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    const message = error?.message || "Email delivery failed";
    throw new Error(message);
  }
}

export default { sendVerificationEmail };
