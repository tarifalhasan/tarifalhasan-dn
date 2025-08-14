import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, recaptchaToken } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message || !recaptchaToken) {
      return NextResponse.json({ error: "All fields and reCAPTCHA verification are required" }, { status: 400 })
    }

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken)
    if (!isRecaptchaValid) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 })
    }

    // Custom email template for Resend
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #0f172a;
          }
          .container {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            border-radius: 12px;
            padding: 2px;
          }
          .content {
            background: #1e293b;
            border-radius: 10px;
            padding: 30px;
            color: #e2e8f0;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
          }
          .title {
            color: #f1f5f9;
            font-size: 24px;
            font-weight: bold;
            margin: 0;
          }
          .subtitle {
            color: #94a3b8;
            font-size: 16px;
            margin: 5px 0 0 0;
          }
          .field {
            margin-bottom: 20px;
            padding: 15px;
            background: #334155;
            border-radius: 8px;
            border-left: 4px solid #10b981;
          }
          .field-label {
            font-weight: bold;
            color: #94a3b8;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
          }
          .field-value {
            color: #f1f5f9;
            font-size: 16px;
            word-wrap: break-word;
          }
          .message-field {
            background: #475569;
            border: 1px solid #64748b;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #475569;
            color: #94a3b8;
            font-size: 14px;
          }
          .ai-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-left: 10px;
          }
          .security-badge {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-left: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <div class="header">
              <div class="logo">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.5 2A7.5 7.5 0 0 0 4 10.5V14a7.5 7.5 0 0 0 7.5 7.5h1A7.5 7.5 0 0 0 20 14v-3.5A7.5 7.5 0 0 0 12.5 3h-3Z" fill="white"/>
                  <path d="M8 10.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM13 10.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" fill="#4f46e5"/>
                </svg>
              </div>
              <h1 class="title">New Contact Form Submission</h1>
              <p class="subtitle">From Tarif AI Portfolio <span class="ai-badge">AI-POWERED</span><span class="security-badge">SECURE</span></p>
            </div>

            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${name}</div>
            </div>

            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${email}</div>
            </div>

            <div class="field">
              <div class="field-label">Subject</div>
              <div class="field-value">${subject}</div>
            </div>

            <div class="message-field">
              <div class="field-label">Message</div>
              <div class="field-value">${message.replace(/\n/g, "<br>")}</div>
            </div>

            <div class="footer">
              <p>This message was sent from your AI-powered portfolio contact form.</p>
              <p>✅ reCAPTCHA verified • 🔒 Secure transmission</p>
              <p>Timestamp: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "contact@yourdomain.com",
      to: process.env.CONTACT_EMAIL || "your-email@example.com",
      subject: `Portfolio Contact: ${subject}`,
      html: htmlTemplate,
      replyTo: email,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ message: "Email sent successfully", id: data?.id })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
