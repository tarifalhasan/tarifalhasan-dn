import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import type React from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Tarif Al Hasan - Full-Stack Developer & AI Specialist",
    template: "%s | Tarif Al Hasan - Developer Portfolio",
  },
  description:
    "Experienced full-stack developer specializing in React, Next.js, Node.js, and AI integration. Creating scalable web applications with modern technologies and best practices.",
  keywords: [
    "Tarif Al Hasan",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Expert",
    "Node.js Developer",
    "AI Integration",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Frontend Developer",
    "Backend Developer",
    "API Development",
    "Database Design",
    "DevOps",
    "AWS",
    "MongoDB",
    "PostgreSQL",
    "E-commerce Development",
    "Healthcare Software",
    "FinTech Applications",
  ],
  authors: [{ name: "Tarif Al Hasan" }],
  creator: "Tarif Al Hasan",
  publisher: "Tarif Al Hasan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tarifalhasan.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tarifalhasan.vercel.app",
    title: "Tarif Al Hasan - Full-Stack Developer & AI Specialist",
    description:
      "Experienced full-stack developer specializing in React, Next.js, Node.js, and AI integration. Creating scalable web applications with modern technologies.",
    siteName: "Tarif Al Hasan Portfolio",
    images: [
      {
        url: "/tarif-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Tarif Al Hasan - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarif Al Hasan - Full-Stack Developer & AI Specialist",
    description:
      "Experienced full-stack developer specializing in React, Next.js, Node.js, and AI integration.",
    images: ["/tarif-portrait.jpg"],
    creator: "@tarifalhasan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  generator: "v0.app",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tarif Al Hasan",
  url: "https://tarifalhasan.vercel.app",
  image: "https://tarifalhasan.vercel.app/tarif-portrait.jpg",
  sameAs: [
    "https://github.com/tarifalhasan",
    "https://linkedin.com/in/tarifalhasan",
    "https://twitter.com/tarifalhasan",
  ],
  jobTitle: "Full-Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  alumniOf: {
    "@type": "Organization",
    name: "Computer Science",
  },
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "AI Integration",
    "Web Development",
    "Full-Stack Development",
    "API Development",
    "Database Design",
    "DevOps",
    "AWS",
    "MongoDB",
    "PostgreSQL",
  ],
  description:
    "Experienced full-stack developer specializing in React, Next.js, Node.js, and AI integration. Creating scalable web applications with modern technologies and best practices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
      </head>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
