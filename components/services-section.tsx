"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { LampContainer } from "@/components/ui/lamp";
import {
  Cloud,
  Database,
  Globe,
  Server,
  Shield,
  Smartphone,
} from "lucide-react";

type ServiceCard = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  features: string[];
  area: string;
};

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "./ui/button";

const services: ServiceCard[] = [
  {
    icon: Globe,
    title: "Frontend Development",
    description:
      "Modern, responsive web applications using React, Next.js, and cutting-edge UI frameworks.",
    color: "from-[#7c3aed] via-[#6366f1] to-[#22d3ee]",
    features: ["React/Next.js", "TypeScript", "Tailwind CSS",],
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Scalable server-side solutions with robust APIs, databases, and cloud integrations.",
    color: "from-[#0ea5e9] to-[#14b8a6]",
    features: ["Node.js/Express", "PostgreSQL", "MongoDB"],
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps with native performance and seamless user experiences.",
    color: "from-[#ec4899] to-[#f472b6]",
    features: ["React Native", "Flutter", "iOS/Android", ],
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/9/2/13]",
  },
  {
    icon: Database,
    title: "Database Design",
    description:
      "Optimized database architecture with performance tuning and data modeling expertise.",
    color: "from-[#f97316] to-[#f43f5e]",
    features: [
      "SQL/NoSQL",
      "Data Modeling",
      "Performance Tuning",
      "Migrations",
    ],
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:2/1/3/6]",
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    description:
      "CI/CD pipelines, cloud infrastructure, and automated deployment solutions.",
    color: "from-[#4f46e5] to-[#a855f7]",
    features: ["AWS/Vercel", "Docker", "CI/CD", "Monitoring"],
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/6/3/10]",
  },
  {
    icon: Shield,
    title: "Security & Testing",
    description:
      "Comprehensive security audits, testing strategies, and performance optimization.",
    color: "from-[#facc15] to-[#fb923c]",
    features: ["Security Audits", "Performance"],
    area: "xl:[grid-area:2/10/3/13] hidden md:block",
  },
];

export const ServicesSection = () => {
  return (
    <div id="services" className="pt-0 relative overflow-hidden lg:pt-0 mb-12">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-[4rem] lg:mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Services & Solutions
        </motion.h1>
      </LampContainer>

      <ul className="grid grid-cols-1 -mt-[15rem] p-4 lg:p-0 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        {services.map((service) => (
          <GridItem key={service.title} {...service} />
        ))}
      </ul>
      <div className="flex justify-center mt-5 lg:mt-10">
   
          <Button asChild className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#22d3ee] hover:from-[#6d28d9] hover:via-[#9333ea] hover:to-[#0ea5e9] text-white py-3 disabled:opacity-50 shadow-lg shadow-[#7c3aed]/30">
           <Link href={"#contact"} passHref className="cursor-pointer">Contact Me</Link>
          </Button>
    
      </div>
    </div>
  );
};

const GridItem = ({
  area,
  icon: Icon,
  title,
  description,
  color,
  features,
}: ServiceCard) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-white/10 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.05}
        />
        <div className="relative flex h-full flex-col gap-5 rounded-xl border border-white/5 bg-slate-950/80 p-6 shadow-[0_0_27px_0_rgba(45,45,45,0.45)]">
          <div>
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center shadow-lg shadow-black/40`}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm text-slate-300">{description}</p>
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            {features.map((feature) => (
              <span
                key={feature}
                className="text-xs px-2 py-1 rounded border border-white/15 text-slate-200 bg-white/5"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};
