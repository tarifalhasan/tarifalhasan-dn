"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Brain, Terminal, Play, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { TypewriterText } from "./typewriter-text"
import Image from "next/image"
import { useState, useEffect } from "react"

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

const aiCommands = [
  { command: "ai.analyze('user_behavior')", output: "✓ Personalization engine active", delay: 0 },
  { command: "ai.recommend('optimal_solutions')", output: "✓ Smart recommendations ready", delay: 2000 },
  { command: "ai.optimize('performance')", output: "✓ AI-powered optimization complete", delay: 4000 },
  { command: "ai.predict('user_needs')", output: "✓ Predictive analytics initialized", delay: 6000 },
]

export const HeroSection = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [showOutput, setShowOutput] = useState(false)
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCommandIndex < aiCommands.length) {
        const currentCmd = aiCommands[currentCommandIndex]

        // Add command to history
        setTimeout(() => {
          setTerminalHistory((prev) => [...prev, { command: currentCmd.command, output: currentCmd.output }])
          setCurrentCommandIndex((prev) => prev + 1)
        }, currentCmd.delay)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [currentCommandIndex])

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="glass-effect rounded-xl p-8 mb-12 relative overflow-hidden flex items-center"
      style={{ minHeight: "calc(100vh - 2rem)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
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
              left: `${20 + i * 10}%`,
              top: `${30 + i * 8}%`,
            }}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-slate-900/50 rounded-lg p-6 mb-8 border border-slate-700"
          >
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-700">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300 text-sm font-mono">AI Terminal v2.0</span>
              <div className="flex gap-1 ml-auto">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>

            <div className="space-y-2 text-sm font-mono max-h-48 overflow-y-auto">
              <motion.div variants={itemVariants} className="text-slate-400">
                <span className="text-emerald-400">ai-dev@portfolio:~$</span> whoami
              </motion.div>
              <motion.div variants={itemVariants} className="text-indigo-300 pl-4">
                <TypewriterText text="Tarif Al Hasan - AI-Powered Full-Stack Developer" />
              </motion.div>

              <motion.div variants={itemVariants} className="text-slate-400 mt-4">
                <span className="text-emerald-400">ai-dev@portfolio:~$</span> cat mission.ai
              </motion.div>
              <motion.div variants={itemVariants} className="text-slate-300 pl-4">
                <TypewriterText text="Transforming ideas into intelligent digital experiences" delay={1000} />
              </motion.div>

              <motion.div variants={itemVariants} className="text-slate-400 mt-4">
                <span className="text-emerald-400">ai-dev@portfolio:~$</span> ./initialize_ai_systems.sh
              </motion.div>

              {terminalHistory.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-1"
                >
                  <div className="text-slate-400 pl-4">
                    <span className="text-cyan-400">→</span> {entry.command}
                  </div>
                  <div className="text-emerald-400 pl-8 flex items-center gap-2">
                    <Zap className="w-3 h-3" />
                    {entry.output}
                  </div>
                </motion.div>
              ))}

              {currentCommandIndex < aiCommands.length && (
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="text-emerald-400 pl-4"
                >
                  <span className="text-slate-400">Loading AI modules</span>
                  <span className="ml-2">█</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-300 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6"
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
              Building next-generation applications with AI at their core. I create intelligent systems that learn,
              adapt, and evolve - from personalized user experiences to predictive analytics and automated
              decision-making. Let's harness the power of artificial intelligence to solve complex problems and create
              meaningful impact.
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
                  className="border-indigo-300 text-indigo-300 hover:bg-indigo-300 hover:text-slate-900 bg-transparent backdrop-blur-sm"
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
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Explore AI Solutions
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 bg-transparent backdrop-blur-sm"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch AI Demo
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
          {/* Animated background rings with updated colors */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 w-80 h-80 border-2 border-indigo-300/20 rounded-full"
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

          {/* AI-themed glowing orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
              animate={{
                x: [0, 60, 0, -60, 0],
                y: [0, -60, 0, 60, 0],
                opacity: [0.3, 1, 0.3, 1, 0.3],
                scale: [1, 1.5, 1, 1.5, 1],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.2,
              }}
              style={{
                left: `${35 + i * 10}%`,
                top: `${35 + i * 10}%`,
              }}
            />
          ))}

          {/* Main photo container with updated styling */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 group">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 30px rgba(16, 185, 129, 0.4)",
                  "0 0 50px rgba(6, 182, 212, 0.5)",
                  "0 0 30px rgba(16, 185, 129, 0.4)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="w-72 h-72 rounded-full overflow-hidden border-4 border-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 p-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <Image
                    src="/tarif-portrait.jpg"
                    alt="Tarif Al Hasan - AI-Powered Full Stack Developer"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Updated tech stack badges with services section colors */}
            <motion.div
              animate={{
                y: [-15, 15, -15],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-6 -right-6 w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-xl border-2 border-yellow-400"
            >
              AI
            </motion.div>

            <motion.div
              animate={{
                y: [15, -15, 15],
                rotate: [0, -360, 0],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-xl border-2 border-blue-400"
            >
              ⚛️
            </motion.div>

            <motion.div
              animate={{
                x: [-15, 15, -15],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xl border-2 border-indigo-400"
            >
              ▲
            </motion.div>

            <motion.div
              animate={{
                x: [15, -15, 15],
                y: [-10, 10, -10],
              }}
              transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
              className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold shadow-xl border-2 border-emerald-400"
            >
              N
            </motion.div>

            <motion.div
              animate={{
                rotate: [0, 360, 0],
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 20px rgba(16, 185, 129, 0.5)",
                  "0 0 40px rgba(16, 185, 129, 0.8)",
                  "0 0 20px rgba(16, 185, 129, 0.5)",
                ],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl border-2 border-emerald-300"
            >
              🤖
            </motion.div>

            <motion.div
              animate={{
                y: [10, -10, 10],
                x: [-5, 5, -5],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2.5 }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xl border-2 border-purple-400"
            >
              ML
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
