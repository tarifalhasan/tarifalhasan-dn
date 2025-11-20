"use client";

import { AdvancedNavbar } from "@/components/advanced-navbar";
import { BlogModal } from "@/components/blog-modal";
import { ContactSection } from "@/components/contact-section";
import { FloatingParticles } from "@/components/floating-particles";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { SkillConnections } from "@/components/skill-connections";
import type { BlogPost } from "@/data/blog-posts";
import { useState } from "react";
import { Testimonials } from "./AnimatedTestimonials";
import FeaturedProjects from "./featured-projects";
import ImpactShowcase from "./impact-showcase";
import { ProjedctShowcase } from "./ProjedctShowcase";
import SkillSection from "./skill-section";

type HomePageClientProps = {
  blogArticles: BlogPost[];
};

export function HomePageClient({ blogArticles }: HomePageClientProps) {
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(
    null
  );
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const openBlogModal = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setIsBlogModalOpen(true);
  };

  const closeBlogModal = () => {
    setIsBlogModalOpen(false);
    setSelectedBlogPost(null);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#181c34,_#050912_60%)] dark:bg-[radial-gradient(circle_at_top,_#01030a,_#050912_65%)] text-foreground relative overflow-hidden">
      <FloatingParticles />
      <AdvancedNavbar />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <HeroSection />
        <ServicesSection />
        <ImpactShowcase />
        <SkillConnections />

        {/* Skills Section */}
        <SkillSection />

        {/* Development Process */}
        <div className="mb-6 lg:mb-12">
          <div className="section-eyebrow mb-6">Delivery Framework</div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description:
                  "Understanding requirements, user research, and technical architecture planning.",
                icon: "🔍",
              },
              {
                step: "02",
                title: "Design & Prototyping",
                description:
                  "UI/UX design, wireframing, and interactive prototypes for validation.",
                icon: "🎨",
              },
              {
                step: "03",
                title: "Development & Testing",
                description:
                  "Agile development with continuous testing, code reviews, and quality assurance.",
                icon: "⚡",
              },
              {
                step: "04",
                title: "Deployment & Support",
                description:
                  "Production deployment, monitoring, maintenance, and ongoing support.",
                icon: "🚀",
              },
            ].map((process, index) => (
              <div key={process.step} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#38bdf8] rounded-full flex items-center justify-center text-2xl font-bold text-white relative shadow-lg shadow-[#7c3aed]/40">
                  <span className="text-sm">{process.step}</span>
                  <div className="absolute -top-2 -right-2 text-2xl">
                    {process.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-violet-200 mb-2 group-hover:text-violet-400 transition-colors">
                  {process.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <FeaturedProjects />
        {/* Product Timeline */}
        <div className="mb-12">
          <ProjedctShowcase />
        </div>

        {/* Blog & Articles */}
        <div className=" mb-6 lg:mb-12">
          <div className="section-eyebrow mb-6">Insights & Articles</div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogArticles.map((article, index) => (
              <div
                key={article.id}
                className="glass-effect rounded-lg p-6 group cursor-pointer"
                onClick={() => openBlogModal(article)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📖</span>
                  <span className="text-xs luminous-pill text-slate-800 dark:text-slate-100">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-indigo-200 mb-3 group-hover:text-indigo-200 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    {article.date}
                  </div>
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center gap-2 mt-4 text-indigo-500 dark:text-indigo-300 text-sm group-hover:text-indigo-300 transition-colors">
                  Read More <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className=" mb-6 lg:mb-12">
          <Testimonials />
        </div>

        {/* Achievements & Certifications */}
        <div className=" mb-6 lg:mb-12">
          <div className="section-eyebrow mb-6">
            Certifications & Highlights
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                year: "2022",
              },
              {
                title: "React",
                subtitle: "Advanced Certification",
                icon: "⚛️",
                year: "2022",
              },
            ].map((achievement, index) => (
              <div
                key={achievement.title}
                className="glass-effect rounded-lg p-6 text-center group"
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-indigo-200 mb-1 group-hover:text-indigo-200 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                  {achievement.subtitle}
                </p>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                  <span>🏆</span>
                  {achievement.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ContactSection />
      </div>

      {/* BlogModal component */}
      <BlogModal
        isOpen={isBlogModalOpen}
        onClose={closeBlogModal}
        post={selectedBlogPost}
      />
    </div>
  );
}
