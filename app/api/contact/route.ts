import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
};

async function verifyRecaptcha(token: string) {
  if (token === "not-available") {
    return { success: true, score: 1.0 };
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      throw new Error("reCAPTCHA secret key is not configured");
    }

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();

    // Check if the verification was successful (v3 uses score-based verification)
    if (data.success && data.score >= 0.5) {
      return { success: true, score: data.score };
    } else {
      return {
        success: false,
        error: "reCAPTCHA verification failed",
        score: data.score || 0,
      };
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { success: false, error: "Failed to verify reCAPTCHA" };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, recaptchaToken } =
      await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const isRecaptchaConfigured =
      process.env.RECAPTCHA_SECRET_KEY &&
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (isRecaptchaConfigured && !recaptchaToken) {
      return NextResponse.json(
        { error: "reCAPTCHA verification required" },
        { status: 400 }
      );
    }

    if (recaptchaToken && recaptchaToken !== "not-available") {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaResult.success) {
        return NextResponse.json(
          {
            error: "Security check failed. Please try again.",
            details: recaptchaResult.error,
            score: recaptchaResult.score,
          },
          { status: 400 }
        );
      }
    }

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #1e293b;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .container {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
            border-radius: 16px;
            padding: 2px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          }
          .content {
            background: white;
            border-radius: 14px;
            padding: 40px;
          }
          .header {
            text-align: center;
            margin-bottom: 32px;
          }
          .logo {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
            box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
          }
          .title {
            color: #0f172a;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.025em;
          }
          .subtitle {
            color: #64748b;
            font-size: 16px;
            margin: 8px 0 0 0;
            font-weight: 500;
          }
          .field {
            margin-bottom: 24px;
            padding: 20px;
            background: linear-gradient(135deg, #f1f5f9 0%, #f8fafc 100%);
            border-radius: 12px;
            border-left: 4px solid #6366f1;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          }
          .field-label {
            font-weight: 600;
            color: #475569;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
          }
          .field-value {
            color: #0f172a;
            font-size: 16px;
            word-wrap: break-word;
            font-weight: 500;
          }
          .message-field {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px;
            margin-top: 24px;
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
          }
          .footer {
            text-align: center;
            margin-top: 32px;
            padding-top: 24px;
            border-top: 2px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
          }
          .ai-badge {
            display: inline-flex;
            align-items: center;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-left: 12px;
            box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
          }
          .icon {
            width: 16px;
            height: 16px;
            margin-right: 6px;
          }
          .timestamp {
            background: #f1f5f9;
            padding: 12px 16px;
            border-radius: 8px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 13px;
            color: #475569;
            margin-top: 16px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <div class="header">
              <div class="logo">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.8"/>
                  <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 class="title">New Contact Submission</h1>
              <p class="subtitle">From Tarif AI Portfolio <span class="ai-badge">🤖 AI-POWERED</span></p>
            </div>

            <div class="field">
              <div class="field-label">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Full Name
              </div>
              <div class="field-value">${name}</div>
            </div>

            <div class="field">
              <div class="field-label">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email Address
              </div>
              <div class="field-value">${email}</div>
            </div>

            <div class="field">
              <div class="field-label">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Subject Line
              </div>
              <div class="field-value">${subject}</div>
            </div>

            <div class="message-field">
              <div class="field-label">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                Message Content
              </div>
              <div class="field-value">${message.replace(/\n/g, "<br>")}</div>
            </div>

            <div class="footer">
              <p><strong>Sent via AI-Enhanced Contact System</strong></p>
              <p>This message was securely transmitted${
                isRecaptchaConfigured ? " through reCAPTCHA verification" : ""
              }</p>
              <div class="timestamp">
                📅 ${new Date().toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "contact@yourdomain.com",
      to: process.env.CONTACT_EMAIL || "your-email@example.com",
      subject: `🤖 AI Portfolio Contact: ${subject}`,
      html: htmlTemplate,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Email sent successfully",
      id: data?.id,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
