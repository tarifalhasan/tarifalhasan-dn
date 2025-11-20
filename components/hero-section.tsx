"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Sparkles } from "lucide-react";
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
      {/* <div className="hero-ambient">
        <div className="hero-orb hero-orb--violet" />
        <div className="hero-orb hero-orb--cyan" />
        <div className="hero-orb hero-orb--emerald" />
      </div> */}

      <div className="mb-12 flex flex-col gap-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center w-full relative z-10">
          <div className="space-y-8">
            <div>
              <h1
                className="text-4xl lg:text-[3.4rem] font-bold bg-clip-text text-transparent leading-tight"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #5BBFF6 0%, #7F6AF2 28%, #B651D7 49%, #E83E54 67%, #ED8939 100%)",
                }}
              >
                Tarif Al Hasan
              </h1>

              <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed max-w-2xl">
                As a Full-Stack Developer and Freelance, I build
                high-performance web apps, APIs, and digital platforms using
                React, Next.js, Node.js, Prisma, Supabase, and modern DevOps
                workflows. My focus is on clean architecture, scalability, and
                exceptional user experience.
              </p>
            </div>

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

            <div className="flex flex-wrap gap-4">
              <div>
                <Link href={"#contact"} className="cursor-pointer">
                  <Button
                    size="lg"
                    className="text-white border-0 shadow-lg shadow-[#5BBFF6]/30 px-8 hover:opacity-90 transition-opacity"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #5BBFF6 0%, #7F6AF2 28%, #B651D7 49%, #E83E54 67%, #ED8939 100%)",
                    }}
                  >
                    Projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div>
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
              </div>
            </div>

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

          <div className="relative flex justify-center lg:justify-end">
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
          </div>
        </div>
      </div>
    </div>
  );
};
