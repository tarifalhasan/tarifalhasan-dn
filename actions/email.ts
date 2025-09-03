"use server";

import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

type FormSubmissionData = {
  field: string;
  value: string;
}[];

export async function sendFormToEmail(
  formData: FormSubmissionData,
  formName: string
) {
  try {
    // Format the form data for the email
    const formFields = formData.reduce((acc: Record<string, string>, item) => {
      acc[item.field] = item.value;
      return acc;
    }, {});

    // Get the current date
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Send the email with professional HTML template
    const { data, error } = await resend.emails.send({
      from: "Form Submission <onboarding@resend.dev>", // Update with your verified domain
      to: process.env.NOTIFICATION_EMAIL as string,
      subject: `New Form Submission: ${formName}`,
      html: generateEmailTemplate(formFields, formName, currentDate),
    });

    if (error) {
      console.error("Email sending failed:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error };
  }
}

function generateEmailTemplate(
  formFields: Record<string, string>,
  formName: string,
  date: string
): string {
  // Extract common fields if they exist
  const fullName = formFields["full-name"] || formFields["name"] || "N/A";
  const email = formFields["email"] || "N/A";
  const subject = formFields["subject"] || formFields["subject"] || "N/A";
  const message = formFields["message"] || "N/A";

  // Create field rows for any additional fields
  const additionalFields = Object.entries(formFields)
    .filter(
      ([key]) => !["full-name", "email", "subject", "message"].includes(key)
    )
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #E1E1E1; text-transform: capitalize; font-weight: 600; color: #333333; width: 30%;">${key.replace(
          /-/g,
          " "
        )}</td>
        <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #E1E1E1; color: #666666;">${value}</td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; color: #333333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background-color: #6b21a8; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Form Submission</h1>
        </div>
        
        <!-- Summary Bar -->
        <div style="background-color: #f3f4f6; padding: 15px 30px; border-bottom: 1px solid #e5e7eb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="font-size: 14px;"><strong>Form:</strong> ${formName}</td>
              <td style="text-align: right; font-size: 14px;"><strong>Date:</strong> ${date}</td>
            </tr>
          </table>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #E1E1E1; font-weight: 600; color: #333333; width: 30%;">Full Name</td>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #E1E1E1; color: #666666;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #E1E1E1; font-weight: 600; color: #333333;">Email</td>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #E1E1E1; color: #666666;"><a href="mailto:${email}" style="color: #6b21a8; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #E1E1E1; font-weight: 600; color: #333333;">subject</td>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #E1E1E1; color: #666666;">${subject}</td>
            </tr>
            ${additionalFields}
            <tr>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #E1E1E1; font-weight: 600; color: #333333;">Message</td>
              <td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #E1E1E1; color: #666666; white-space: pre-line;">${message}</td>
            </tr>
          </table>
          
          <!-- CTA Button -->
          <div style="margin-top: 30px; text-align: center;">
            <a href="${
              process.env.NEXT_PUBLIC_SITE_URL || "https://yourwebsite.com"
            }/admin" style="background-color: #6b21a8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500; display: inline-block;">View in Dashboard</a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #e5e7eb;">
          <p>This is an automated message from your website form submission system.</p>
          <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
