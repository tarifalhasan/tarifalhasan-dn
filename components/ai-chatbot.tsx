"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles, User } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatbot = ({ isOpen, onClose }: AIChatbotProps) => {
  const expertSummary = useMemo(
    () =>
      "Tarif Al Hasan is a senior web & app developer with 5+ years of experience in building high-performance products for startups and enterprises. He focuses on polished frontends (React, Next.js, Tailwind), reliable APIs (Node.js, TypeScript, PostgreSQL), and cloud-ready deployments on Vercel, AWS, or Azure. Tarif understands AI-assisted workflows and can integrate AI-powered experiences when needed, but his primary strength is shipping robust, user-focused web applications end to end.",
    []
  );

  const generateLocalResponse = (rawMessage: string) => {
    const message = rawMessage.toLowerCase();

    const defaultResponse =
      expertSummary +
      "\n\nKey strengths:\n• Frontend: React 19, Next.js 15, Tailwind 4, Framer Motion, accessible design systems\n• Backend: Node.js, TypeScript, Prisma, REST/GraphQL APIs, authentication & billing flows\n• Mobile/Hybrid: React Native + Expo, PWA techniques, offline-ready UX\n• Cloud/DevOps: Vercel, AWS, Docker, CI/CD, monitoring, error observability\n• Collaboration: clear comms, fast iterations, launch support, ongoing maintenance\n\nHe also understands AI tooling (OpenAI, LangChain) and can integrate those features, but web/app development remains the core focus.";

    if (
      message.includes("project") ||
      message.includes("portfolio") ||
      message.includes("arbeit") ||
      message.includes("case")
    ) {
      return (
        "Project highlights:\n" +
        "1. Multi-tenant SaaS dashboard with role-based access, subscription billing, and analytics.\n" +
        "2. Marketplace platform (web + mobile) with real-time messaging, Stripe Connect, and CMS tooling.\n" +
        "3. Operational portal for healthcare providers—secure scheduling, EHR integrations, custom reports.\n" +
        "4. High-conversion landing + onboarding flows for consumer apps (A/B tested, Lighthouse 95+).\n" +
        "5. Internal productivity suite: custom CRM, task automation, and Slack/Teams integrations.\n\n" +
        "Each engagement focuses on reliability, clean UX, and measurable business value."
      );
    }

    if (
      message.includes("ai") ||
      message.includes("ml") ||
      message.includes("machine")
    ) {
      return (
        "AI knowledge:\n" +
        "Tarif is primarily a web/app engineer but keeps up with practical AI integrations.\n" +
        "• Uses OpenAI / LangChain for chatbots, search, and content automation.\n" +
        "• Understands how to wire AI endpoints into Next.js, tRPC, or mobile clients.\n" +
        "• Focuses on responsible usage: prompt design, guardrails, caching, fallbacks.\n" +
        "• Partners with dedicated ML teams when deep model training is required.\n\n" +
        "Expect pragmatic AI features layered onto solid web/mobile foundations."
      );
    }

    if (
      message.includes("skill") ||
      message.includes("stack") ||
      message.includes("tech") ||
      message.includes("technology") ||
      message.includes("technologies") ||
      message.includes("technologies used") ||
      message.includes("technologies used in") ||
      message.includes("technologies used in the project") ||
      message.includes("technologies used in the project")
    ) {
      return (
        "Tech-stack overview:\n" +
        "Frontend → React, Next.js 15 (App Router), Tailwind 4, Shadcn/Radix UI, GSAP/Motion.\n" +
        "Backend → Node.js (Express, Fastify, Nest), TypeScript, Prisma, PostgreSQL, MongoDB.\n" +
        "Mobile → React Native, Expo Router, native modules where needed.\n" +
        "Cloud → Vercel, AWS (Lambda/ECS/RDS), Azure App Services, Docker, Terraform/Bicep.\n" +
        "Tooling → Turborepo, Vitest/Playwright, ESLint/Prettier, Datadog/Sentry.\n" +
        "AI add-ons → OpenAI, LangChain, Pinecone used selectively when a project benefits from it."
      );
    }

    if (
      message.includes("contact") ||
      message.includes("hire") ||
      message.includes("collab") ||
      message.includes("reach") ||
      message.includes("email") ||
      message.includes("contact me") ||
      message.includes("contact you") ||
      message.includes("contact us") ||
      message.includes("contact you") ||
      message.includes("contact them") ||
      message.includes("contact them")
    ) {
      return (
        "Here's how you can reach Tarif directly:\n" +
        "• Email: tarifalhasan@gmail.com (fastest way, replies usually <24h)\n" +
        "• Telegram / WhatsApp: +880 1779 158124\n" +
        "• LinkedIn: https://www.linkedin.com/in/tarif-al-hasan/\n" +
        "• Facebook: https://facebook.com/tarifalhasanjs\n\n" +
        "He is available for custom web dashboards, SaaS products, mobile apps, codebase revamps, and product discovery sprints."
      );
    }

    if (
      message.includes("react") ||
      message.includes("next") ||
      message.includes("frontend") ||
      message.includes("frontend development") ||
      message.includes("frontend engineer") ||
      message.includes("frontend developer") ||
      message.includes("frontend architect") ||
      message.includes("frontend designer") ||
      message.includes("frontend developer") ||
      message.includes("frontend architect") ||
      message.includes("frontend designer") ||
      message.includes("frontend developer") ||
      message.includes("frontend architect") ||
      message.includes("frontend designer") ||
      message.includes("frontend developer") ||
      message.includes("frontend architect") ||
      message.includes("frontend designer") ||
      message.includes("frontend developer") ||
      message.includes("frontend architect") ||
      message.includes("frontend designer") ||
      message.includes("frontend developer") ||
      message.includes("frontend architect") ||
      message.includes("frontend designer")
    ) {
      return (
        "Frontend focus:\n" +
        "• Next.js Latest App Router: RSC, server actions, image/CDN optimizations\n" +
        "• Component systems: Shadcn + Radix UI, custom tokens, Tailwind theming\n" +
        "• Performance: streaming SSR, Suspense boundaries, hydration strategies, Lighthouse 95+\n" +
        "• State/data: Zustand, TanStack Query, server-side adapters, GraphQL clients\n" +
        "• QA: Storybook, Chromatic, automated visual regression + Playwright"
      );
    }

    if (
      message.includes("python") ||
      message.includes("node") ||
      message.includes("backend") ||
      message.includes("api") ||
      message.includes("database") ||
      message.includes("mongodb") ||
      message.includes("postgresql") ||
      message.includes("redis") ||
      message.includes("elasticsearch") ||
      message.includes("kafka") ||
      message.includes("rabbitmq") ||
      message.includes("kafka") ||
      message.includes("rabbitmq") ||
      message.includes("kafka") ||
      message.includes("rabbitmq")
    ) {
      return (
        "Backend & automation:\n" +
        "• Node.js (Nest, Fastify, Express) + TypeScript, using Prisma/Drizzle over PostgreSQL\n" +
        "• Authentication: NextAuth, Clerk, custom JWT flows, role-based access\n" +
        "• Background work: BullMQ, Temporal, serverless cron jobs, webhook routing\n" +
        "• Observability: structured logging, Datadog/Sentry, OpenTelemetry traces\n" +
        "• API design: REST/GraphQL, BFFs for web + mobile, external partner integrations"
      );
    }

    return defaultResponse;
  };
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Tarif's AI assistant, powered by LangChain and advanced language models. I have comprehensive knowledge about his expertise in AI development, full-stack architecture, and enterprise solutions. How may I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    const responseText = generateLocalResponse(currentInput);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-lg overflow-hidden rounded-none max-h-[90vh] overflow-y-auto border-none bg-transparent p-0 shadow-none ">
        <div
          className={`bg-white/90 dark:bg-slate-950/90  rounded-lg backdrop-blur-2xl w-full ${
            isMinimized ? "h-16" : "h-[650px]"
          } flex flex-col overflow-hidden`}
        >
          <div className="flex items-center justify-between p-5 border-b border-white/30 dark:border-white/5 bg-gradient-to-r from-[#5f26c0] via-[#8a3bd3] to-[#015866] text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold">
                  Tarif's AI Assistant
                </h3>
                <p className="text-xs text-teal-200 flex items-center">
                  <div className="w-2 h-2 bg-teal-200 rounded-full mr-2 animate-pulse"></div>
                  GPT-4o Powered • Online
                </p>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-4  ">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[85%]`}>
                      {message.sender === "ai" && (
                        <div className="w-8 h-8 bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-[#22d3ee] rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#22d3ee] text-white shadow-lg"
                            : "bg-white/80 dark:bg-white/5 text-slate-800 dark:text-slate-100 border border-white/40 dark:border-white/10 shadow-md backdrop-blur-sm"
                        }`}
                      >
                        {message.text}
                      </div>
                      {message.sender === "user" && (
                        <div className="w-8 h-8 bg-white/80 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                          <User className="w-4 h-4 text-slate-600 dark:text-slate-200" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-[#22d3ee] rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 px-4 py-3 rounded-2xl shadow-md backdrop-blur-sm">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-slate-500 dark:text-slate-300 mr-2">
                            AI is processing
                          </span>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-5 border-t border-white/30 dark:border-white/5 bg-gradient-to-r from-white/80 to-white/50 dark:from-slate-950/50 dark:to-slate-950/80 backdrop-blur-sm">
                <div className="flex space-x-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Tarif's expertise, projects, or experience..."
                    className="flex-1 bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 rounded-xl h-12 px-4 backdrop-blur-sm transition-all duration-200"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#22d3ee] hover:from-[#6d28d9] hover:via-[#9333ea] hover:to-[#0ea5e9] text-white border-0 h-12 px-4 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
