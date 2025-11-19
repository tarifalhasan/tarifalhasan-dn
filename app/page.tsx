import { HomePageClient } from "@/components/home-page-client";
import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";
import Script from "next/script";

const baseUrl = "https://tarifalhasan.vercel.app";

const serviceSeo = [
  {
    name: "Full-Stack Web Development",
    description:
      "End-to-end product delivery with React, Next.js, Node.js, and scalable cloud-native APIs.",
    url: `${baseUrl}/#services`,
  },
  {
    name: "AI Automation & Agents",
    description:
      "LangChain workflows, OpenAI integrations, and custom copilots that accelerate product teams.",
    url: `${baseUrl}/#services`,
  },
  {
    name: "Realtime & 3D Interfaces",
    description:
      "WebGL, React Three Fiber, and data visualizations that feel tactile across devices.",
    url: `${baseUrl}/#projects`,
  },
  {
    name: "DevOps & Cloud Reliability",
    description:
      "CI/CD pipelines, observability, and infrastructure as code for secure enterprise launches.",
    url: `${baseUrl}/#services`,
  },
];

export const metadata: Metadata = {
  title: "Tarif Al Hasan | Full-Stack Web Developer & AI Engineer",
  description:
    "Portfolio of Tarif Al Hasan – Full-Stack Web Developer specializing in Next.js, React, Node.js, LangChain automation, realtime 3D interfaces, and enterprise cloud launches.",
  keywords: [
    "Full-Stack Web Developer",
    "Next.js expert",
    "React Three Fiber",
    "LangChain developer",
    "AI automation engineer",
    "DevOps",
    "Realtime applications",
  ],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Tarif Al Hasan | Full-Stack Web Developer & AI Engineer",
    description:
      "Building immersive web experiences with React, Next.js, LangChain, and cloud-native APIs. Explore case studies, services, and client testimonials.",
    url: baseUrl,
    siteName: "Tarif Al Hasan Portfolio",
  },
};

const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tarif Al Hasan Professional Services",
  itemListElement: serviceSeo.map((service, index) => ({
    "@type": "Service",
    position: index + 1,
    name: service.name,
    description: service.description,
    url: service.url,
    serviceType: service.name,
    provider: {
      "@type": "Person",
      name: "Tarif Al Hasan",
      jobTitle: "Full-Stack Web Developer & AI Engineer",
      url: baseUrl,
    },
    areaServed: "Global",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${baseUrl}/#contact`,
      availableLanguage: ["English", "German"],
    },
  })),
};

export default function PortfolioPage() {
  return (
    <>
      <HomePageClient blogArticles={blogPosts} />
      <Script
        id="services-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(servicesStructuredData)}
      </Script>
    </>
  );
}
