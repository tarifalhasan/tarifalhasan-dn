"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, CheckCircle, AlertCircle, Shield, Info } from "lucide-react"
import { motion } from "framer-motion"

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
  loading: () => <div className="h-[78px] bg-slate-800/30 rounded-lg animate-pulse" />,
})

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

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
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaAvailable, setRecaptchaAvailable] = useState(true)
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null)

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
  const isRecaptchaConfigured = siteKey && siteKey !== "" && !siteKey.includes("example")

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
    if (token) {
      setRecaptchaError(null)
    }
  }

  const onRecaptchaError = () => {
    setRecaptchaError("reCAPTCHA failed to load. You can still submit the form.")
    setRecaptchaAvailable(false)
  }

  const onRecaptchaExpired = () => {
    setRecaptchaToken(null)
    setRecaptchaError("reCAPTCHA expired. Please verify again.")
  }

  const onSubmit = async (data: FormData) => {
    if (isRecaptchaConfigured && recaptchaAvailable && !recaptchaToken) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken: recaptchaToken || "not-available",
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        form.reset()
        setRecaptchaToken(null)
        if (typeof window !== "undefined" && window.grecaptcha) {
          window.grecaptcha.reset()
        }
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
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

              {isRecaptchaConfigured && recaptchaAvailable && (
                <motion.div variants={itemVariants} className="flex justify-center">
                  <div className="bg-slate-800/30 p-2 rounded-lg backdrop-blur-sm border border-slate-600">
                    <ReCAPTCHA
                      sitekey={siteKey!}
                      onChange={onRecaptchaChange}
                      theme="dark"
                      onError={onRecaptchaError}
                      onExpired={onRecaptchaExpired}
                    />
                  </div>
                </motion.div>
              )}

              {!isRecaptchaConfigured && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center text-amber-400 text-sm bg-amber-400/10 p-3 rounded-lg border border-amber-400/20"
                >
                  <Info className="w-4 h-4 mr-2" />
                  reCAPTCHA not configured. Form submission available without verification.
                </motion.div>
              )}

              {recaptchaError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center text-amber-400 text-sm bg-amber-400/10 p-3 rounded-lg border border-amber-400/20"
                >
                  <Info className="w-4 h-4 mr-2" />
                  {recaptchaError}
                </motion.div>
              )}

              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting || (isRecaptchaConfigured && recaptchaAvailable && !recaptchaToken)}
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
