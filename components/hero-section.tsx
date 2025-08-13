"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const HeroSection = () => {
  return (
    <div
      className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
      style={{ minHeight: "calc(100vh - 2rem)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,145,178,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(8,145,178,0.05),transparent_50%)]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-600/30 rounded-full"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
            }}
            style={{
              left: `${30 + i * 20}%`,
              top: `${40 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-2">
              <motion.p
                className="text-cyan-600 dark:text-cyan-400 font-medium tracking-wide uppercase text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Full-Stack Developer
              </motion.p>
              <motion.h1
                className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Building Tomorrow's
                <span className="block text-transparent bg-gradient-to-r from-cyan-600 to-emerald-500 bg-clip-text">
                  Solutions Today
                </span>
              </motion.h1>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                Innovative Web Development Tailored to Your Needs
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                I'm Tarif Al Hasan, a passionate developer who transforms complex ideas into elegant, scalable digital
                solutions. Let's build something extraordinary together.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore My Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-6 text-lg font-medium bg-transparent"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6 pt-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 to-emerald-100/50 dark:from-cyan-900/20 dark:to-emerald-900/20 rounded-full blur-3xl transform scale-150" />

            <motion.div whileHover={{ scale: 1.02 }} className="relative z-10">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-cyan-600 to-emerald-500 p-1">
                <div className="w-full h-full rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                  <Image
                    src="/tarif-portrait.jpg"
                    alt="Tarif Al Hasan - Full Stack Developer"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700"
              >
                <span className="text-2xl">⚛️</span>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700"
              >
                <span className="text-yellow-500 font-bold text-lg">JS</span>
              </motion.div>

              <motion.div
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700"
              >
                <span className="text-black dark:text-white font-bold">▲</span>
              </motion.div>

              <motion.div
                animate={{ x: [3, -3, 3] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700"
              >
                <span className="text-green-600 font-bold">N</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
