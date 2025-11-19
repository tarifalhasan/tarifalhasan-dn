"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Github, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const heroStats = [
  {
    label: "Full-Stack Projects",
    value: "300+",
    detail: "Frontend · Backend · Deployment",
  },
  {
    label: "Global Clients",
    value: "50+",
    detail: "Startups & Businesses",
  },
  {
    label: "Delivery Speed",
    value: "2–4 Weeks",
    detail: "Fast & efficient execution",
  },
  {
    label: "Performance Score",
    value: "98",
    detail: "Optimized with Lighthouse",
  },
];

const heroHighlights = [
  {
    badge: "Modern Web Development",
    title: "Next.js, React, Tailwind, Node.js & API-Driven Architecture",
    description:
      "I build scalable systems, performant interfaces, optimized data models, and modern development pipelines.",
  },
  {
    badge: "Freelance Workflows",
    title: "Clear communication, fast iterations, and reliable delivery",
    description:
      "I collaborate closely with clients—from planning to deployment—with long-term support when needed.",
  },
];

export const HeroSection = () => {
  return (
    <div id="home" className="pt-18 lg:pt-24 relative z-10">
      <div className="hero-ambient">
        <div className="hero-orb hero-orb--violet" />
        <div className="hero-orb hero-orb--cyan" />
        <div className="hero-orb hero-orb--emerald" />
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-effect hero-shell p-8 lg:p-12 mb-12 relative flex flex-col gap-10"
      >
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center w-full relative z-10">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl lg:text-[3.4rem] font-bold bg-gradient-to-r from-[#f0abfc] via-[#a5b4fc] to-[#5eead4] bg-clip-text text-transparent leading-tight"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Tarif Al Hasan
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed max-w-2xl"
              >
                As a Full-Stack Developer and Freelance, I build
                high-performance web apps, APIs, and digital platforms using
                React, Next.js, Node.js, Prisma, Supabase, and modern DevOps
                workflows. My focus is on clean architecture, scalability, and
                exceptional user experience.
              </motion.p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="hero-stat-card">
                  <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mt-1">
                    {stat.label}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={"#contact"} className="cursor-pointer">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#22d3ee] hover:from-[#6d28d9] hover:via-[#9333ea] hover:to-[#0ea5e9] text-white border-0 shadow-lg shadow-[#7c3aed]/40 px-8"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  passHref
                  target="_blank"
                  href={"http://github.com/tarifalhasan/"}
                  className="cursor-pointer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-400 text-slate-800 dark:border-slate-600 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm px-8"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <div className="space-y-5 not-sr-only lg:sr-only">
              {heroHighlights.map((highlight) => (
                <div key={highlight.badge} className="hero-highlight">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-2">
                    {highlight.badge}
                  </p>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                    {highlight.title}
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="hero-portrait-wrapper">
              <div className="hero-portrait-ring" />
              <div className="hero-portrait-ring hero-portrait-ring--outer" />
              <div className="hero-portrait">
                <Image
                  src="/tarif-portrait.jpg"
                  alt="Tarif Al Hasan - Full-Stack Developer Portrait"
                  fill
                  sizes="(max-width: 768px) 280px, 360px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="floating-badge light top-6 left-6">
              <Sparkles className="w-4 h-4" />
              Frontend UX
            </div>
            <div className="floating-badge bottom-10 right-6">
              <Sparkles className="w-4 h-4" />
              Backend APIs
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
