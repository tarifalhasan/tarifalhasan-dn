"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { TypewriterText } from "./typewriter-text"
import Image from "next/image"

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

export const HeroSection = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="terminal-window rounded-xl p-8 mb-12 relative overflow-hidden flex items-center"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Terminal Content */}
        <div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3 text-sm font-mono mb-8"
          >
            <motion.div variants={itemVariants} className="text-slate-400">
              <span className="text-emerald-400">developer@portfolio:~$</span> whoami
            </motion.div>
            <motion.div variants={itemVariants} className="text-emerald-400 pl-4">
              <TypewriterText text="Full-Stack Developer & UI/UX Enthusiast" />
            </motion.div>
            <motion.div variants={itemVariants} className="text-slate-400">
              <span className="text-emerald-400">developer@portfolio:~$</span> cat mission.txt
            </motion.div>
            <motion.div variants={itemVariants} className="text-cyan-300 pl-4">
              <TypewriterText text="Code. Create. Conquer." delay={1000} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              TARIF AL HASAN
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-slate-300 mb-8 text-lg leading-relaxed"
            >
              Welcome to my digital playground. Dive into my projects, explore my skills, and let's build something
              amazing together. I transform ideas into elegant, scalable solutions that make a difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-slate-900 bg-transparent backdrop-blur-sm"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 bg-transparent backdrop-blur-sm"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(99, 102, 241, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Hire Me Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 bg-transparent backdrop-blur-sm"
                >
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Animated background rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 w-80 h-80 border-2 border-indigo-400/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-4 w-72 h-72 border border-purple-400/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-8 w-64 h-64 border border-cyan-400/20 rounded-full"
          />

          {/* Glowing orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
              animate={{
                x: [0, 60, 0, -60, 0],
                y: [0, -60, 0, 60, 0],
                opacity: [0.2, 1, 0.2, 1, 0.2],
                scale: [1, 1.5, 1, 1.5, 1],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.5,
              }}
              style={{
                left: `${40 + i * 8}%`,
                top: `${40 + i * 8}%`,
              }}
            />
          ))}

          {/* Main photo container */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 group">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 30px rgba(99, 102, 241, 0.4)",
                  "0 0 50px rgba(139, 92, 246, 0.5)",
                  "0 0 30px rgba(99, 102, 241, 0.4)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="w-72 h-72 rounded-full overflow-hidden border-4 border-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 p-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <Image
                    src="/tarif-portrait.jpg"
                    alt="Tarif Al Hasan - Full Stack Developer"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* JavaScript */}
            <motion.div
              animate={{
                y: [-15, 15, -15],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-6 -right-6 w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-black font-bold text-lg shadow-xl border-2 border-yellow-300"
            >
              JS
            </motion.div>

            {/* React */}
            <motion.div
              animate={{
                y: [15, -15, 15],
                rotate: [0, -360, 0],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-xl border-2 border-cyan-300"
            >
              ⚛️
            </motion.div>

            {/* Next.js */}
            <motion.div
              animate={{
                x: [-15, 15, -15],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-black to-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xl border-2 border-gray-600"
            >
              ▲
            </motion.div>

            {/* Node.js */}
            <motion.div
              animate={{
                x: [15, -15, 15],
                y: [-10, 10, -10],
              }}
              transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
              className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-green-500 to-green-700 rounded-lg flex items-center justify-center text-white font-bold shadow-xl border-2 border-green-400"
            >
              N
            </motion.div>

            {/* ChatGPT/AI */}
            <motion.div
              animate={{
                rotate: [0, 360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl border-2 border-emerald-300"
            >
              🤖
            </motion.div>

            {/* TypeScript */}
            <motion.div
              animate={{
                y: [10, -10, 10],
                x: [-5, 5, -5],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2.5 }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xl border-2 border-blue-400"
            >
              TS
            </motion.div>

            {/* MongoDB */}
            <motion.div
              animate={{
                rotate: [0, -10, 0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 3 }}
              className="absolute top-8 -left-4 w-10 h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-xl border-2 border-green-500"
            >
              M
            </motion.div>

            {/* Docker */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 3.5 }}
              className="absolute top-8 -right-4 w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-xl border-2 border-blue-300"
            >
              🐳
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
