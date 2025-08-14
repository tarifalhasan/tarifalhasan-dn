"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

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

const formFields = [
  { label: "Name", type: "text", placeholder: "Enter your name", name: "name" },
  { label: "Email", type: "email", placeholder: "Enter your email", name: "email" },
  { label: "Subject", type: "text", placeholder: "Enter subject", name: "subject" },
]

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="glass-effect rounded-xl p-8"
    >
      <div className="text-emerald-400 mb-6 font-mono">
        <span className="text-slate-400">$</span> ./contact_me.sh --interactive
      </div>

      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {formFields.map((field) => (
              <motion.div key={field.label} variants={itemVariants}>
                <label className="text-slate-300 text-sm block mb-2 font-medium">{field.label}:</label>
                <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                  <Input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-indigo-400 focus:ring-indigo-400/20 backdrop-blur-sm"
                    placeholder={field.placeholder}
                    required
                  />
                </motion.div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <label className="text-slate-300 text-sm block mb-2 font-medium">Message:</label>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-indigo-400 focus:ring-indigo-400/20 backdrop-blur-sm min-h-[120px]"
                  placeholder="Enter your message"
                  required
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
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
                    Send Message
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
