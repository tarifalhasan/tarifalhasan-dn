"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FloatingParticles } from "@/components/floating-particles"
import { AdvancedNavbar } from "@/components/advanced-navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import { ExternalLink, Code, Cpu, Github, Star, Calendar, Award, BookOpen, ArrowRight } from "lucide-react"

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

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const [activeSection, setActiveSection] = useState("hero")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-slate-100 relative overflow-hidden">
      <FloatingParticles />
      <AdvancedNavbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-8 relative z-10"
      >
        <HeroSection />
        <ServicesSection />

        {/* Skills Section */}
        <motion.div
          id="about"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-xl p-8 mb-12"
        >
          <div className="text-emerald-400 mb-6 font-mono">
            <span className="text-slate-400">$</span> scan --skills --verbose
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-indigo-300 font-semibold mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Technical Skills
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "JavaScript/TypeScript", level: 95 },
                    { name: "React/Next.js", level: 90 },
                    { name: "Node.js/Express", level: 85 },
                    { name: "Python/Django", level: 80 },
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">{skill.name}</span>
                        <span className="text-indigo-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-cyan-300 font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Core Expertise
                </h3>
                <div className="space-y-3">
                  {[
                    "Frontend Architecture",
                    "API Development",
                    "Database Design",
                    "DevOps & Deployment",
                    "UI/UX Design",
                    "Performance Optimization",
                  ].map((expertise, index) => (
                    <motion.div
                      key={expertise}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-2 h-2 bg-emerald-400 rounded-full"
                      />
                      {expertise}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Development Process */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-xl p-8 mb-12"
        >
          <div className="text-emerald-400 mb-6 font-mono">
            <span className="text-slate-400">$</span> ./development-process.sh --show-workflow
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description: "Understanding requirements, user research, and technical architecture planning.",
                icon: "🔍",
              },
              {
                step: "02",
                title: "Design & Prototyping",
                description: "UI/UX design, wireframing, and interactive prototypes for validation.",
                icon: "🎨",
              },
              {
                step: "03",
                title: "Development & Testing",
                description: "Agile development with continuous testing, code reviews, and quality assurance.",
                icon: "⚡",
              },
              {
                step: "04",
                title: "Deployment & Support",
                description: "Production deployment, monitoring, maintenance, and ongoing support.",
                icon: "🚀",
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-sm">{process.step}</span>
                  <motion.div
                    className="absolute -top-2 -right-2 text-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                  >
                    {process.icon}
                  </motion.div>
                </motion.div>
                <h3 className="text-lg font-semibold text-indigo-300 mb-2 group-hover:text-indigo-200 transition-colors">
                  {process.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          id="projects"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-xl p-8 mb-12"
        >
          <div className="text-emerald-400 mb-6 font-mono">
            <span className="text-slate-400">$</span> ls projects/ --featured --detailed
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: "E-Commerce Platform",
                description:
                  "Full-stack e-commerce solution with advanced features including real-time inventory, payment processing, and analytics dashboard.",
                tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
                gradient: "from-purple-500 to-pink-500",
                category: "Full-Stack",
              },
              {
                title: "AI Task Manager",
                description:
                  "Intelligent task management with AI-powered prioritization, natural language processing, and team collaboration features.",
                tech: ["React", "Node.js", "OpenAI", "MongoDB"],
                gradient: "from-blue-500 to-cyan-500",
                category: "AI/ML",
              },
              {
                title: "Real-time Chat App",
                description:
                  "Scalable messaging platform with WebSocket connections, file sharing, and end-to-end encryption.",
                tech: ["Socket.io", "Express", "Redis", "React"],
                gradient: "from-emerald-500 to-teal-500",
                category: "Real-time",
              },
              {
                title: "Crypto Trading Dashboard",
                description:
                  "Advanced trading interface with real-time market data, portfolio tracking, and automated trading strategies.",
                tech: ["Vue.js", "Python", "WebSocket", "Chart.js"],
                gradient: "from-orange-500 to-red-500",
                category: "FinTech",
              },
              {
                title: "Healthcare Management",
                description:
                  "HIPAA-compliant patient management system with appointment scheduling and telemedicine integration.",
                tech: ["Angular", "Django", "PostgreSQL", "AWS"],
                gradient: "from-indigo-500 to-purple-500",
                category: "Healthcare",
              },
              {
                title: "Social Media Analytics",
                description:
                  "Comprehensive social media monitoring tool with sentiment analysis and engagement metrics.",
                tech: ["React", "Python", "TensorFlow", "D3.js"],
                gradient: "from-yellow-500 to-orange-500",
                category: "Analytics",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.3)",
                }}
                className="glass-effect rounded-lg p-6 group cursor-pointer"
              >
                <motion.div
                  className={`w-full h-2 bg-gradient-to-r ${project.gradient} rounded-full mb-4`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-indigo-300 group-hover:text-indigo-200 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">{project.category}</span>
                </div>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                      className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-slate-900 bg-transparent"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 bg-transparent"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-xl p-8 mb-12"
        >
          <div className="text-emerald-400 mb-6 font-mono">
            <span className="text-slate-400">$</span> grep -r "testimonials" ./client-feedback/
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                name: "Sarah Johnson",
                role: "CTO, TechStart Inc.",
                content:
                  "Tarif delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise is outstanding.",
                rating: 5,
                avatar: "SJ",
              },
              {
                name: "Michael Chen",
                role: "Product Manager, InnovateCorp",
                content:
                  "Working with Tarif was a game-changer for our project. He transformed our complex requirements into an elegant, scalable solution.",
                rating: 5,
                avatar: "MC",
              },
              {
                name: "Emily Rodriguez",
                role: "Founder, HealthTech Solutions",
                content:
                  "The healthcare management system Tarif built is robust, secure, and user-friendly. Highly recommend his full-stack expertise.",
                rating: 5,
                avatar: "ER",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="glass-effect rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-indigo-300 font-semibold">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{testimonial.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Blog & Articles */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-xl p-8 mb-12"
        >
          <div className="text-emerald-400 mb-6 font-mono">
            <span className="text-slate-400">$</span> find ./blog -name "*.md" | head -3
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Building Scalable React Applications",
                excerpt:
                  "Best practices for architecting large-scale React applications with performance optimization techniques.",
                date: "Dec 15, 2024",
                readTime: "8 min read",
                category: "React",
              },
              {
                title: "Modern API Design Patterns",
                excerpt: "Exploring RESTful and GraphQL API design patterns for building robust backend services.",
                date: "Dec 10, 2024",
                readTime: "12 min read",
                category: "Backend",
              },
              {
                title: "DevOps for Full-Stack Developers",
                excerpt: "Essential DevOps practices every full-stack developer should know for efficient deployment.",
                date: "Dec 5, 2024",
                readTime: "10 min read",
                category: "DevOps",
              },
            ].map((article, index) => (
              <motion.div
                key={article.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="glass-effect rounded-lg p-6 group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">{article.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-indigo-300 mb-3 group-hover:text-indigo-200 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{article.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </div>
                  <span>{article.readTime}</span>
                </div>
                <motion.div
                  className="flex items-center gap-2 mt-4 text-indigo-400 text-sm group-hover:text-indigo-300 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Achievements & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-xl p-8 mb-12"
        >
          <div className="text-emerald-400 mb-6 font-mono">
            <span className="text-slate-400">$</span> cat achievements.json | jq '.certifications[]'
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: "AWS Certified",
                subtitle: "Solutions Architect",
                icon: "☁️",
                year: "2024",
              },
              {
                title: "Google Cloud",
                subtitle: "Professional Developer",
                icon: "🌐",
                year: "2023",
              },
              {
                title: "MongoDB",
                subtitle: "Certified Developer",
                icon: "🍃",
                year: "2023",
              },
              {
                title: "React",
                subtitle: "Advanced Certification",
                icon: "⚛️",
                year: "2022",
              },
            ].map((achievement, index) => (
              <motion.div
                key={achievement.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="glass-effect rounded-lg p-6 text-center group"
              >
                <motion.div
                  className="text-4xl mb-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                >
                  {achievement.icon}
                </motion.div>
                <h3 className="text-indigo-300 font-semibold mb-1 group-hover:text-indigo-200 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-slate-300 text-sm mb-2">{achievement.subtitle}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
                  <Award className="w-3 h-3" />
                  {achievement.year}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <ContactSection />
      </motion.div>
    </div>
  )
}
