// Function to verify reCAPTCHA token
export async function verifyRecaptcha(token: string) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!secretKey) {
      throw new Error("reCAPTCHA secret key is not configured")
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()

    // Check if the verification was successful (v3 uses score-based verification)
    if (data.success && data.score >= 0.5) {
      return { success: true, score: data.score }
    } else {
      return {
        success: false,
        error: "reCAPTCHA verification failed",
        score: data.score || 0,
      }
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return { success: false, error: "Failed to verify reCAPTCHA" }
  }
}
