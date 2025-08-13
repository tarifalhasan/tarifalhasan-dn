"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { TypewriterText } from "./typewriter-text"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
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

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export const HeroSection = () => {
  return (
    <div
      className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden"
      style={{ minHeight: "calc(100vh - 2rem)" }}
    >
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent_70%)]" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-green-400"
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2 text-green-400"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-mono">SYSTEM ONLINE</span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                {`<span className="text-green-400">&gt;</span>`} Hello, I'm{" "}
                <span className="text-green-400">Tarif Al Hasan</span>
              </h1>

              <div className="text-xl lg:text-2xl text-gray-300">
                <TypewriterText
                  texts={["Full Stack Developer", "React Specialist", "Node.js Expert", "UI/UX Enthusiast"]}
                />
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-gray-400 leading-relaxed max-w-lg">
              I craft digital experiences with clean code and innovative solutions. Passionate about building scalable
              applications that make a difference.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-black font-semibold px-8 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-3 transition-all duration-300 bg-transparent"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex space-x-6 pt-4">
              {[
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 border border-green-400/30 rounded-lg flex items-center justify-center text-green-400 hover:bg-green-400/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image with Floating Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main Profile Image */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-2 border-green-400/30 shadow-2xl shadow-green-500/20"
              >
                <Image
                  src="/tarif-portrait.jpg"
                  alt="Tarif Al Hasan - Full Stack Developer"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>

              {/* Floating Tech Stack Badges */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute -top-6 -right-6 w-16 h-16 bg-gray-800 border border-green-400/30 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-blue-400 font-bold text-lg">React</span>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-800 border border-green-400/30 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-green-400 font-bold text-lg">Node</span>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1 }}
                className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-14 h-14 bg-gray-800 border border-green-400/30 rounded-lg flex items-center justify-center shadow-lg"
              >
                <span className="text-yellow-400 font-bold">JS</span>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1.5 }}
                className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-14 h-14 bg-gray-800 border border-green-400/30 rounded-lg flex items-center justify-center shadow-lg"
              >
                <span className="text-purple-400 font-bold">TS</span>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 2 }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-800 border border-green-400/30 rounded-lg flex items-center justify-center shadow-lg"
              >
                <span className="text-cyan-400 font-bold text-sm">CSS</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
