"use client"

import { Button } from "@/components/ui/button"
import { Github, Brain, Terminal, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { TypewriterText } from "./typewriter-text"
import Image from "next/image"
import { useState, useEffect } from "react"

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

const professionalAiCommands = [
  {
    command: "ai.initialize('neural_networks')",
    output: "✓ Deep learning models loaded successfully",
    delay: 1000,
    type: "success",
  },
  {
    command: "ai.analyze('market_trends', 'real_time')",
    output: "✓ Predictive analytics engine active",
    delay: 3000,
    type: "info",
  },
  {
    command: "ai.optimize('user_experience')",
    output: "✓ Personalization algorithms deployed",
    delay: 5000,
    type: "success",
  },
  {
    command: "ai.deploy('intelligent_solutions')",
    output: "✓ AI-powered applications ready for production",
    delay: 7000,
    type: "success",
  },
]

export const HeroSection = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string; type: string }>>([])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const executeCommands = async () => {
      for (let i = 0; i < professionalAiCommands.length; i++) {
        const cmd = professionalAiCommands[i]

        setTimeout(() => {
          setIsTyping(true)
          setTimeout(() => {
            setTerminalHistory((prev) => [...prev, cmd])
            setIsTyping(false)
            setCurrentCommandIndex(i + 1)
          }, 800)
        }, cmd.delay)
      }
    }

    executeCommands()
  }, [])

  return (
    <div id="home" className="pt-16">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-effect rounded-2xl p-8 mb-12 relative overflow-hidden"
        style={{ minHeight: "calc(100vh - 2rem)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400/20 rounded-full"
              animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.5,
              }}
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center w-full relative z-10">
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <span className="text-slate-300 font-semibold">AI Terminal v2.0</span>
                </div>
                <div className="flex gap-2 ml-auto">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
              </div>

              <div className="space-y-3 text-sm font-mono max-h-64 overflow-y-auto">
                <motion.div variants={itemVariants} className="text-slate-400">
                  <span className="text-emerald-400">tarif@ai-dev:~$</span> whoami
                </motion.div>
                <motion.div variants={itemVariants} className="text-indigo-300 pl-6 font-medium">
                  <TypewriterText text="Senior AI Engineer & Full-Stack Architect" />
                </motion.div>

                <motion.div variants={itemVariants} className="text-slate-400 mt-4">
                  <span className="text-emerald-400">tarif@ai-dev:~$</span> cat expertise.json
                </motion.div>
                <motion.div variants={itemVariants} className="text-slate-300 pl-6">
                  <TypewriterText
                    text='{"focus": "Enterprise AI Solutions", "impact": "Scalable & Intelligent"}'
                    delay={1500}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="text-slate-400 mt-4">
                  <span className="text-emerald-400">tarif@ai-dev:~$</span> ./deploy_ai_systems.sh
                </motion.div>

                {terminalHistory.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-2"
                  >
                    <div className="text-slate-400 pl-6">
                      <span className="text-cyan-400">→</span> <span className="text-slate-300">{entry.command}</span>
                    </div>
                    <div
                      className={`pl-10 flex items-center gap-2 ${
                        entry.type === "success" ? "text-emerald-400" : "text-cyan-400"
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span className="font-medium">{entry.output}</span>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    className="text-slate-400 pl-6 flex items-center gap-2"
                  >
                    <span>Processing AI modules...</span>
                    <div className="w-2 h-4 bg-emerald-400 animate-pulse"></div>
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
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-300 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% 200%" }}
              >
                TARIF AL HASAN
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-slate-300 mb-8 text-lg leading-relaxed max-w-2xl"
              >
                Transforming businesses through cutting-edge AI solutions. I architect intelligent systems that drive
                innovation, from machine learning pipelines to neural networks that adapt and evolve. Let's build the
                future of technology together with enterprise-grade AI applications.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-lg px-8"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Explore AI Solutions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent backdrop-blur-sm px-8"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View Projects
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Subtle rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-0 w-80 h-80 border border-indigo-300/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-8 w-64 h-64 border border-purple-400/10 rounded-full"
            />

            {/* Professional photo container */}
            <motion.div whileHover={{ scale: 1.02 }} className="relative z-10">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(99, 102, 241, 0.2)",
                    "0 0 60px rgba(139, 92, 246, 0.3)",
                    "0 0 40px rgba(99, 102, 241, 0.2)",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="w-72 h-72 rounded-full overflow-hidden border-2 border-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 p-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                  <Image
                    src="/tarif-portrait.jpg"
                    alt="Tarif Al Hasan - AI Engineer & Full Stack Developer"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-xl border border-indigo-400/50"
              >
                AI
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-xl border border-cyan-400/50"
              >
                ⚛️
              </motion.div>

              <motion.div
                animate={{ x: [-6, 6, -6] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xl border border-emerald-400/50"
              >
                ML
              </motion.div>

              <motion.div
                animate={{ x: [6, -6, 6] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 3 }}
                className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold shadow-xl border border-purple-400/50"
              >
                TS
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
