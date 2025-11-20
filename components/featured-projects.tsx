import { GlowingEffect } from "@/components/ui/glowing-effect";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const FeaturedProjects = () => {
  interface Project {
    title: string;
    description: string;
    tech: string[];
    gradient: string;
    category: string;
    image: string;
    link: string;
    code: string;
    demo: string;
  }

  const projects: Project[] = [
    {
      title: "NexCommercePro",
      description:
        "Modern Full-Stack E-Commerce Platform After months of work, I'm excited to launch NexCommercePro, a complete, production-ready e-commerce platform built with Next.js 16, TypeScript, Prisma & PostgreSQL.",
      tech: ["Next.js", "PostgreSQL", "Prisma", "Shadcn/UI"],
      gradient: "from-purple-500 to-pink-500",
      category: "Full-Stack",
      image: "/images/nextcommercepro.avif",
      link: "https://nexcommercepro.vercel.app",
      code: "private",
      demo: "https://nexcommercepro.vercel.app",
    },
    {
      title: "Cryptoin1",
      description:
        "CryptoIn1 ermöglicht es, Web3-Presales, Tokenomics und Community-Growth in einer dynamischen Plattform zu erleben. Verbinde deine Wallet, sichere dir CIN-Token und verfolge Live-Kennzahlen.",
      tech: ["React.js", "Next.js", "TypeScript", "Shadcn/UI"],
      gradient: "from-purple-500 to-pink-500",
      category: "Full-Stack",
      image: "/images/cryptoin1.avif",
      link: "https://cin-omega.vercel.app",
      code: "private",
      demo: "https://cin-omega.vercel.app",
    },
    {
      title: "Aethra React Website",
      description:
        "Aethra offers innovative digital solutions tailored to your needs. Explore our cutting-edge services and stay ahead in the digital era.",
      tech: ["React.js", "Next.js", "TailwindCSS", "MongoDB"],
      gradient: "from-purple-500 to-pink-500",
      category: "Full-Stack",
      image: "/images/aethra.avif",
      link: "https://aethra.vercel.app",
      code: "private",
      demo: "https://aethra.vercel.app",
    },
    {
      title: "BubbleDefi Defi Platform",
      description:
        "BubbleDefi is a decentralized finance platform that allows you to earn interest on your crypto assets. It is built with React.js, Next.js, TailwindCSS, and MongoDB.",
      tech: ["React.js", "Next.js", "TailwindCSS"],
      gradient: "from-purple-500 to-pink-500",
      category: "Full-Stack",
      image: "/images/bubble-defi.avif",
      link: "https://b-ubble-defi.vercel.app",
      code: "private",
      demo: "https://b-ubble-defi.vercel.app",
    },
    {
      title: "Clinic Management System",
      description:
        "ClinicManagementSystem is a platform that allows you to manage your clinic. It is built with React.js, Next.js, TailwindCSS, and MongoDB.",
      tech: ["Next.js", "TailwindCSS", "MongoDB", "Shadcn/UI"],
      gradient: "from-purple-500 to-pink-500",
      category: "Full-Stack",
      image: "/images/clinicwebsite.avif",
      link: "https://doctor-portal-web.vercel.app",
      code: "private",
      demo: "https://doctor-portal-web.vercel.app",
    },
    {
      title: "Luksai Leaning Platform",
      description:
        "Luksai Leaning Platform is a platform that allows you to learn new skills. It is built with React.js, Next.js, TailwindCSS, and StapiCMS.",
      tech: ["Next.js", "TailwindCSS", "StapiCMS"],
      gradient: "from-purple-500 to-pink-500",
      category: "Full-Stack",
      image: "/images/luksai.avif",
      link: "https://luksai-learning-platform.vercel.app",
      code: "private",
      demo: "https://luksai-learning-platform.vercel.app",
    },
  ];

  return (
    <div id="projects" className="glass-effect rounded-xl p-4 lg:p-8 mb-12">
      <div className="section-eyebrow mb-6">Recent Signature Work</div>

      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project, index: number) => (
          <li key={project.title} className="list-none">
            <div className="relative h-full rounded-2xl border border-white/10 p-3">
              <GlowingEffect
                spread={36}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.05}
              />
              <div className="relative flex h-full flex-col gap-5 rounded-xl border border-white/10 bg-slate-950/80 p-4 shadow-[0_0_27px_0_rgba(45,45,45,0.45)] group">
                <div className="relative w-full overflow-hidden rounded-lg border border-white/10 aspect-[16/9]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                </div>
                <div
                  className={`w-full h-2 bg-gradient-to-r ${project.gradient} rounded-full`}
                />
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <span className="text-xs luminous-pill text-slate-200">
                    {project.category}
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded border border-white/15 text-slate-200 bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex gap-3">
                  <div>
                    <Link href={project.link} target="_blank">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#22d3ee] hover:from-[#6d28d9] hover:via-[#9333ea] hover:to-[#0ea5e9] text-white"
                      >
                        <span className="mr-0.5">🔗</span>
                        Demo
                      </Button>
                    </Link>
                  </div>
                  {project.code === "private" ? null : (
                    <div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-200 hover:bg-white/10"
                      >
                        <span className="mr-2">📁</span>
                        Code
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedProjects;
