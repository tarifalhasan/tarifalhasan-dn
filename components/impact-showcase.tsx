import { WobbleCard } from "@/components/ui/wobble-card";
import { cn } from "@/lib/utils";
import Image from "next/image";

const cards = [
  {
    title: "Product Launch in 9 Weeks",
    body: "Designed, built, and shipped a subscription marketplace with custom pricing, headless checkout, and full CRM automation for a YC-backed SaaS.",
    image: "/images/launch.avif",
    className: "h-full bg-pink-800 min-h-[320px] lg:min-h-[300px]",
    span: "col-span-1 lg:col-span-2",
    accent:
      "absolute -right-4 lg:-right-[25%] grayscale filter -bottom-10 object-contain rounded-2xl",
    width: 500,
    height: 500,
  },
  {
    title: "30% Faster Ops",
    body: "Implemented AI-driven triage flows and Slack-based approvals that reduced support response time from hours to minutes.",
    className: "bg-blue-900  min-h-[260px]",
    span: "col-span-1",
    accent: "",
  },
  {
    title: "Enterprise Trust",
    body: "Built HIPAA-ready patient portals with audit trails, SOC2-ready infrastructure, and zero-downtime deploys across regions.",
    image: "/images/enterprise.avif",
    className: "bg-green-800 min-h-[320px] lg:min-h-[360px]",
    span: "col-span-1 lg:col-span-3",
    accent:
      "absolute -right-10 md:-right-[40%] lg:-right-[10%] -bottom-10 object-contain rounded-2xl",

    width: 500,
    height: 500,
  },
];

const ImpactShowcase = () => {
  return (
    <div className=" mx-auto  mb-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <WobbleCard
          key={card.title}
          containerClassName={`${card.span} relative ${card.className}`}
        >
          <div className="max-w-md">
            <div className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3">
              Impact Highlight
            </div>
            <h3 className="text-left text-center lg:text-left  text-balance text-xl lg:text-3xl font-semibold tracking-[-0.01em] text-white">
              {card.title}
            </h3>
            <p className="mt-4 text-left text-base text-neutral-200">
              {card.body}
            </p>
          </div>
          {card.image && (
            <Image
              width={card.width}
              height={card.height}
              alt={card.title}
              src={card.image}
              className={cn(card.accent, "object-contain hidden lg:block")}
            />
          )}
        </WobbleCard>
      ))}
    </div>
  );
};

export default ImpactShowcase;
