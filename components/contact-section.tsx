"use client"
import { useState, useEffect, useRef } from "react"
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
    grecaptcha: any
    onRecaptchaLoad: () => void
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

const isValidRecaptchaKey = (key: string | undefined): boolean => {
  if (!key || key === "") return false
  if (key.includes("example") || key.includes("placeholder") || key.includes("your-site-key")) return false
  return key.length >= 40 && /^[A-Za-z0-9_-]+$/.test(key)
}

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const recaptchaRef = useRef<HTMLDivElement>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const isRecaptchaConfigured = isValidRecaptchaKey(siteKey)

  useEffect(() => {
    if (!isRecaptchaConfigured) return

    // Load reCAPTCHA script
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
    script.async = true
    script.defer = true

    window.onRecaptchaLoad = () => {
      setRecaptchaLoaded(true)
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          theme: "dark",
          callback: (token: string) => {
            setRecaptchaToken(token)
            setRecaptchaError(null)
          },
          "error-callback": () => {
            setRecaptchaError("reCAPTCHA verification failed. You can still submit the form.")
          },
          "expired-callback": () => {
            setRecaptchaToken(null)
            setRecaptchaError("reCAPTCHA expired. Please verify again.")
          },
        })
      }
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
      delete window.onRecaptchaLoad
    }
  }, [isRecaptchaConfigured, siteKey])

  const onSubmit = async (data: FormData) => {
    if (isRecaptchaConfigured && !recaptchaToken) {
      setRecaptchaError("Please complete the reCAPTCHA verification.")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setRecaptchaError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken: recaptchaToken || "not-configured",
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        form.reset()
        setRecaptchaToken(null)
        // Reset reCAPTCHA
        if (isRecaptchaConfigured && window.grecaptcha) {
          window.grecaptcha.reset()
        }
      } else {
        const errorData = await response.json().catch(() => ({}))
        setSubmitStatus("error")
        if (errorData.error) {
          setRecaptchaError(errorData.error)
        }
      }
    } catch (error) {
      setSubmitStatus("error")
      setRecaptchaError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="glass-effect rounded-xl p-8"
    >
      <div className="text-emerald-400 mb-6 font-mono">
        <span className="text-slate-400">$</span> ./contact_me.sh --secure --interactive
      </div>

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
                      <FormLabel className="text-slate-300 text-sm font-medium">Name:</FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            {...field}
                            className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-indigo-400 focus:ring-indigo-400/20 backdrop-blur-sm"
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
                      <FormLabel className="text-slate-300 text-sm font-medium">Email:</FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            {...field}
                            type="email"
                            className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-indigo-400 focus:ring-indigo-400/20 backdrop-blur-sm"
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
                      <FormLabel className="text-slate-300 text-sm font-medium">Subject:</FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            {...field}
                            className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-indigo-400 focus:ring-indigo-400/20 backdrop-blur-sm"
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
                      <FormLabel className="text-slate-300 text-sm font-medium">Message:</FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Textarea
                            {...field}
                            className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-indigo-400 focus:ring-indigo-400/20 backdrop-blur-sm min-h-[120px]"
                            placeholder="Enter your message"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {isRecaptchaConfigured && (
                <motion.div variants={itemVariants} className="flex justify-center">
                  <div className="bg-slate-800/30 p-2 rounded-lg backdrop-blur-sm border border-slate-600">
                    {recaptchaLoaded ? (
                      <div ref={recaptchaRef} />
                    ) : (
                      <div className="h-[78px] bg-slate-800/30 rounded-lg animate-pulse flex items-center justify-center">
                        <div className="text-slate-400 text-sm">Loading reCAPTCHA...</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {!isRecaptchaConfigured && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center text-slate-400 text-sm bg-slate-800/20 p-3 rounded-lg border border-slate-600/30"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Secure form submission enabled
                </motion.div>
              )}

              {recaptchaError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center text-amber-400 text-sm bg-amber-400/10 p-3 rounded-lg border border-amber-400/20"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {recaptchaError}
                </motion.div>
              )}

              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting || (isRecaptchaConfigured && !recaptchaToken)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 disabled:opacity-50"
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
                  className="flex items-center justify-center text-emerald-400 text-sm"
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
          className="text-center mt-8 space-y-2 text-slate-400 text-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            tarif.al.hasan@example.com
          </div>
          <div>+1 (555) 123-4567</div>
        </motion.div>
      </div>
    </motion.div>
  )
}
