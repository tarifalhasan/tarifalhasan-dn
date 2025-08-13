"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"
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
  { label: "Name", type: "text", placeholder: "Enter your name" },
  { label: "Email", type: "email", placeholder: "Enter your email" },
  { label: "Subject", type: "text", placeholder: "Enter subject" },
]

export const ContactSection = () => {
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {formFields.map((field, index) => (
            <motion.div key={field.label} variants={itemVariants}>
              <label className="text-slate-300 text-sm block mb-2 font-medium">{field.label}:</label>
              <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                <Input
                  type={field.type}
                  className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-indigo-400 focus:ring-indigo-400/20 backdrop-blur-sm"
                  placeholder={field.placeholder}
                />
              </motion.div>
            </motion.div>
          ))}

          <motion.div variants={itemVariants}>
            <label className="text-slate-300 text-sm block mb-2 font-medium">Message:</label>
            <motion.div whileFocus={{ scale: 1.02 }}>
              <Textarea
                className="bg-slate-800/50 border-slate-600 text-slate-100 focus:border-indigo-400 focus:ring-indigo-400/20 backdrop-blur-sm min-h-[120px]"
                placeholder="Enter your message"
              />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3">
              <Mail className="w-5 h-5 mr-2" />
              Send Message
            </Button>
          </motion.div>
        </motion.div>

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
