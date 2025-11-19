"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, useScroll, useSpring } from "motion/react";
import { forwardRef } from "react";

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps> {}

export const ScrollProgress = forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();
    const pathLength = useSpring(scrollYProgress, {
      stiffness: 120,
      damping: 30,
    });

    return (
      <div
        ref={ref}
        className={cn("fixed top-5 right-5 z-50", className)}
        {...props}
      >
        <svg width="52" height="52" viewBox="0 0 52 52">
          <defs>
            <linearGradient
              id="scrollProgressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <circle
            stroke="rgba(148,163,184,0.25)"
            strokeWidth="3"
            fill="rgba(2,6,23,0.65)"
            r="22"
            cx="26"
            cy="26"
          />
          <motion.circle
            stroke="url(#scrollProgressGradient)"
            strokeWidth="3"
            fill="transparent"
            strokeLinecap="round"
            r="22"
            cx="26"
            cy="26"
            style={{ pathLength }}
          />
        </svg>
      </div>
    );
  }
);

ScrollProgress.displayName = "ScrollProgress";
