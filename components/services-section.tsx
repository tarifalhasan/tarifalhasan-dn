"use client"

import { motion } from "framer-motion"
import { Globe, Server, Smartphone, Database, Cloud, Shield } from "lucide-react"

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

const services = [
  {
    icon: Globe,
    title: "Frontend Development",
    description: "Modern, responsive web applications using React, Next.js, and cutting-edge UI frameworks.",
    color: "from-blue-500 to-cyan-500",
    features: ["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Scalable server-side solutions with robust APIs, databases, and cloud integrations.",
    color: "from-emerald-500 to-teal-500",
    features: ["Node.js/Express", "Python/Django", "PostgreSQL", "MongoDB"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Cross-platform mobile apps with native performance and seamless user experiences.",
    color: "from-purple-500 to-pink-500",
    features: ["React Native", "Flutter", "iOS/Android", "App Store Deploy"],
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Optimized database architecture with performance tuning and data modeling expertise.",
    color: "from-orange-500 to-red-500",
    features: ["SQL/NoSQL", "Data Modeling", "Performance Tuning", "Migrations"],
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    description: "CI/CD pipelines, cloud infrastructure, and automated deployment solutions.",
    color: "from-indigo-500 to-purple-500",
    features: ["AWS/Vercel", "Docker", "CI/CD", "Monitoring"],
  },
  {
    icon: Shield,
    title: "Security & Testing",
    description: "Comprehensive security audits, testing strategies, and performance optimization.",
    color: "from-yellow-500 to-orange-500",
    features: ["Security Audits", "Unit Testing", "E2E Testing", "Performance"],
  },
]

export const ServicesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="glass-effect rounded-xl p-8 mb-12"
    >
      <div className="text-emerald-400 mb-6 font-mono">
        <span className="text-slate-400">$</span> cat services.json | jq '.offerings[]'
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.3)",
            }}
            className="glass-effect rounded-lg p-6 group cursor-pointer"
          >
            <motion.div
              className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <service.icon className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-indigo-300 mb-3 group-hover:text-indigo-200 transition-colors">
              {service.title}
            </h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">{service.description}</p>
            <div className="flex flex-wrap gap-2">
              {service.features.map((feature) => (
                <motion.span
                  key={feature}
                  whileHover={{ scale: 1.1 }}
                  className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs"
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
