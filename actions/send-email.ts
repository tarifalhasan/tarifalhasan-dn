"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      to: process.env.CONTACT_EMAIL as string,
      subject: `New Contact Form Submission: ${formData.subject}`,
      html: generateEmailTemplate(formData, currentDate),
    })

    if (error) {
      console.error("Email sending failed:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error }
  }
}

function generateEmailTemplate(formData: ContactFormData, date: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #e2e8f0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
          <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">AI Portfolio Contact</p>
        </div>
        
        <!-- Summary Bar -->
        <div style="background-color: #334155; padding: 15px 30px; border-bottom: 1px solid #475569;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="font-size: 14px; color: #cbd5e1;"><strong>Form:</strong> Contact Form</td>
              <td style="text-align: right; font-size: 14px; color: #cbd5e1;"><strong>Date:</strong> ${date}</td>
            </tr>
          </table>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #475569; font-weight: 600; color: #f1f5f9; width: 30%;">Name</td>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #475569; color: #cbd5e1;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #475569; font-weight: 600; color: #f1f5f9;">Email</td>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #475569; color: #cbd5e1;"><a href="mailto:${formData.email}" style="color: #6366f1; text-decoration: none;">${formData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #475569; font-weight: 600; color: #f1f5f9;">Subject</td>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #475569; color: #cbd5e1;">${formData.subject}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #475569; font-weight: 600; color: #f1f5f9;">Message</td>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #475569; color: #cbd5e1; white-space: pre-line;">${formData.message}</td>
            </tr>
          </table>
          
          <!-- CTA Button -->
          <div style="margin-top: 30px; text-align: center;">
            <a href="mailto:${formData.email}" style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">Reply to ${formData.name}</a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #334155; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #475569;">
          <p>This is an automated message from Tarif AI Portfolio contact form.</p>
          <p>&copy; ${new Date().getFullYear()} Tarif Al Hasan. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
