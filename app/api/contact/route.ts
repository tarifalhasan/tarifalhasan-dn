import { sendFormToEmail } from '@/actions/email'
import { NextResponse } from 'next/server'

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!secretKey) {
      throw new Error('reCAPTCHA secret key is not configured')
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()

    // Check if the verification was successful
    if (data.success && data.score >= 0.5) {
      return { success: true, score: data.score }
    } else {
      return {
        success: false,
        error: 'reCAPTCHA verification failed',
        score: data.score || 0,
      }
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return { success: false, error: 'Failed to verify reCAPTCHA' }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { form, submissionData, recaptchaToken } = body

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        {
          success: false,
          errors: [{ message: 'reCAPTCHA token is missing' }],
        },
        { status: 400 },
      )
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken)

    if (!recaptchaResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: [
            {
              message: 'Security check failed. Please try again.',
              details: recaptchaResult.error,
              score: recaptchaResult.score,
            },
          ],
        },
        { status: 400 },
      )
    }

    // Process the form submission as you normally would
    // This is where you'd save to your Payload CMS database

    // Also send the form data to email
    await sendFormToEmail(submissionData, form)

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
    })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      {
        success: false,
        errors: [{ message: 'Failed to process form submission' }],
      },
      { status: 500 },
    )
  }
}