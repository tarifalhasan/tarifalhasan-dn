"use client";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Server,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { forwardRef, useRef } from "react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white shadow-[0_0_20px_-12px_rgba(0,0,0,0.9)]",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

export const SkillConnections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const dbRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  return (
    <div className="glass-effect rounded-xl p-8 mb-12">
      <div className="section-eyebrow mb-4">Systems Thinking</div>
      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8">
        How each skill connects inside my delivery stack
      </h3>
      <div
        className="relative flex h-[320px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-6"
        ref={containerRef}
      >
        <div className="flex size-full max-h-[220px] max-w-3xl flex-col items-stretch justify-between gap-10">
          <div className="flex flex-row items-center justify-between">
            <Circle ref={reactRef}>
              <Code2 className="h-5 w-5" />
            </Circle>
            <Circle ref={dbRef}>
              <Database className="h-5 w-5" />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={apiRef}>
              <Server className="h-5 w-5" />
            </Circle>
            <Circle ref={aiRef} className="h-16 w-16 text-white">
              <BrainCircuit className="h-7 w-7" />
            </Circle>
            <Circle ref={cloudRef}>
              <Cloud className="h-5 w-5" />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={mobileRef}>
              <Smartphone className="h-5 w-5" />
            </Circle>
            <Circle ref={sparklesRef}>
              <Sparkles className="h-5 w-5" />
            </Circle>
          </div>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={reactRef}
          toRef={aiRef}
          curvature={-80}
          endYOffset={-10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={apiRef}
          toRef={aiRef}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={mobileRef}
          toRef={aiRef}
          curvature={80}
          endYOffset={10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={dbRef}
          toRef={aiRef}
          curvature={-70}
          endYOffset={-12}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={cloudRef}
          toRef={aiRef}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={sparklesRef}
          toRef={aiRef}
          curvature={70}
          endYOffset={12}
          reverse
        />
      </div>
    </div>
  );
};

