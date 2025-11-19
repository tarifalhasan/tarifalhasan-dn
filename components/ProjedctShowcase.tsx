import { Timeline } from "@/components/ui/timeline";

export function ProjedctShowcase() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-6 text-sm text-neutral-200">
            Led an AI-first migration for a fintech suite, unifying dashboards,
            LangChain orchestration, and realtime telemetry into one Next.js
            platform.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/placeholder-qnasp.png"
              alt="Realtime analytics"
              className="h-24 w-full rounded-xl object-cover shadow-2xl shadow-black/40 md:h-40 lg:h-52"
            />
            <img
              src="/placeholder-logo.png"
              alt="Workflow automation"
              className="h-24 w-full rounded-xl bg-slate-950/80 object-contain p-6 shadow-2xl shadow-black/40 md:h-40 lg:h-52"
            />
            <img
              src="/placeholder.jpg"
              alt="Design system"
              className="h-24 w-full rounded-xl object-cover shadow-2xl shadow-black/40 md:h-40 lg:h-52"
            />
            <img
              src="/developer-portrait.png"
              alt="Team collaboration"
              className="h-24 w-full rounded-xl object-cover shadow-2xl shadow-black/40 md:h-40 lg:h-52"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2022 – 2023",
      content: (
        <div>
          <p className="mb-6 text-sm text-neutral-200">
            Delivered a suite of SaaS products—subscription commerce, healthcare
            portals, realtime chat—sharing one design system, TurboRepo, and
            CI/CD stack.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/placeholder-qnasp.png"
              alt="Commerce stack"
              className="h-24 w-full rounded-xl object-cover shadow-2xl shadow-black/40 md:h-40 lg:h-52"
            />
            <img
              src="/placeholder-user.jpg"
              alt="Healthcare portal"
              className="h-24 w-full rounded-xl object-cover shadow-2xl shadow-black/40 md:h-40 lg:h-52"
            />
            <img
              src="/placeholder.png"
              alt="Realtime messaging"
              className="h-24 w-full rounded-xl object-cover shadow-2xl shadow-black/40 md:h-40 lg:h-52"
            />
            <img
              src="/next-js-logo-small.webp"
              alt="Next.js platform"
              className="h-24 w-full rounded-xl bg-slate-950/80 object-contain p-6 shadow-2xl shadow-black/40 md:h-40 lg:h-52"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2019 – 2021",
      content: (
        <div>
          <p className="mb-4 text-sm text-neutral-200">
            Launched my freelance studio, partnering with 40+ founders to build
            workflow automation, dashboards, and marketing sites end-to-end.
          </p>
          <div className="space-y-2 text-sm text-neutral-400">
            <p>✅ First SaaS launch on Vercel + Supabase</p>
            <p>✅ Built team collaboration tooling with WebSockets</p>
            <p>✅ Established component library & motion system</p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
