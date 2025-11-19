"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, CheckCircle, AlertCircle, Shield } from "lucide-react"
import { motion } from "framer-motion"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) return

    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true

    script.onload = () => {
      try {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            try {
              setIsRecaptchaLoaded(true)
            } catch (error) {
              console.warn("reCAPTCHA ready callback failed:", error)
            }
          })
        }
      } catch (error) {
        console.warn("reCAPTCHA initialization failed:", error)
      }
    }

    script.onerror = (error) => {
      console.warn("reCAPTCHA script failed to load:", error)
    }

    document.head.appendChild(script)

    return () => {
      try {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      } catch (error) {
        console.warn("Failed to cleanup reCAPTCHA script:", error)
      }
    }
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      let recaptchaToken = "not-available"

      if (isRecaptchaLoaded && window.grecaptcha) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
        if (siteKey) {
          try {
            const tokenPromise = window.grecaptcha.execute(siteKey, { action: "contact_form" })

            const token = await Promise.race([
              tokenPromise,
              new Promise<string>((_, reject) => setTimeout(() => reject(new Error("reCAPTCHA timeout")), 10000)),
            ]).catch((error) => {
              console.warn("reCAPTCHA execution failed:", error)
              return null
            })

            if (token && typeof token === "string" && token.length > 0) {
              recaptchaToken = token
            }
          } catch (error) {
            console.warn("reCAPTCHA execution error:", error)
            // Continue with "not-available" token
          }
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      }).catch((error) => {
        console.error("Fetch request failed:", error)
        throw new Error("Network request failed")
      })

      if (!response) {
        throw new Error("No response received from server")
      }

      if (response.ok) {
        setSubmitStatus("success")
        form.reset()
      } else {
        let errorMessage = "Unknown error occurred"
        try {
          const errorData = await response.json()
          errorMessage = errorData?.error || errorData?.message || errorMessage
        } catch (parseError) {
          console.warn("Failed to parse error response:", parseError)
          errorMessage = `Server error: ${response.status} ${response.statusText}`
        }

        console.error("Form submission failed:", errorMessage)
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.warn("Unhandled promise rejection caught:", event.reason)
      event.preventDefault()
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  return (
    <motion.div
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="glass-effect rounded-xl p-8"
    >
      <div className="section-eyebrow mb-6">Start A Project</div>

      <div className="max-w-md mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 dark:text-slate-300 text-sm font-medium">
                        Name:
                      </FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            {...field}
                            className="bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-violet-400 focus:ring-violet-400/30"
                            placeholder="Enter your name"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 dark:text-slate-300 text-sm font-medium">
                        Email:
                      </FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            {...field}
                            type="email"
                            className="bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-violet-400 focus:ring-violet-400/30"
                            placeholder="Enter your email"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 dark:text-slate-300 text-sm font-medium">
                        Subject:
                      </FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            {...field}
                            className="bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-violet-400 focus:ring-violet-400/30"
                            placeholder="Enter subject"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 dark:text-slate-300 text-sm font-medium">
                        Message:
                      </FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Textarea
                            {...field}
                            className="bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-violet-400 focus:ring-violet-400/30 min-h-[120px]"
                            placeholder="Enter your message"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center text-slate-600 dark:text-slate-300 text-sm bg-white/70 dark:bg-white/10 p-3 rounded-lg border border-slate-200/60 dark:border-white/10"
              >
                <Shield className="w-4 h-4 mr-2" />
                {isRecaptchaLoaded ? "reCAPTCHA v3 Protected" : "Secure form submission enabled"}
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#22d3ee] hover:from-[#6d28d9] hover:via-[#9333ea] hover:to-[#0ea5e9] text-white py-3 disabled:opacity-50 shadow-lg shadow-[#7c3aed]/30"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Secure Message
                      <Shield className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center text-teal-600 dark:text-emerald-300 text-sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Message sent successfully!
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Failed to send message. Please try again.
                </motion.div>
              )}
            </motion.div>
          </form>
        </Form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 space-y-2 text-slate-600 dark:text-slate-400 text-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            tarifalhasanjs@gmail.com
          </div>
          <div>+8801779158124</div>
        </motion.div>
      </div>
    </motion.div>
  )
}
