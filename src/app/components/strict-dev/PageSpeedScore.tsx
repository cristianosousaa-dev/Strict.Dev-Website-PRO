import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useIsMobile } from "../../../utils/responsive";
import { ArrowUpRight } from "lucide-react";

// ============================================
// PAGESPEED SCORE — animated circular gauges
// Scores honestos com "+" para ranges variáveis
// Link directo para live test no Google
// Swiss Style: #2f5e50, sem emojis
// ============================================

const PAGESPEED_URL = "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fstrict-dev.com%2F";

interface ScoreRingProps {
  /** Minimum guaranteed score (base for animation + arc) */
  baseScore: number;
  /** Show "+" suffix (score varies between tests) */
  isRange: boolean;
  label: string;
  delay: number;
  size: number;
  strokeWidth: number;
}

function ScoreRing({ baseScore, isRange, label, delay, size, strokeWidth }: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const hasAnimatedRef = useRef(false);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const color = "#2f5e50";
  
  // Count-up via motion value
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v: number) => Math.round(v));
  
  useEffect(() => {
    const unsubscribe = rounded.on("change", (v: number) => {
      setDisplayScore(v);
    });
    return unsubscribe;
  }, [rounded]);

  const triggerAnimation = () => {
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      animate(motionValue, baseScore, {
        duration: 1.4,
        delay: delay + 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      });
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 md:gap-2"
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: delay
      }}
      onViewportEnter={triggerAnimation}
    >
      {/* Circle gauge */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-neutral-100 dark:text-[#1a1a1a]"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{
              strokeDashoffset: circumference - (circumference * baseScore) / 100
            }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              type: "spring",
              stiffness: 30,
              damping: 15,
              delay: delay + 0.2,
            }}
          />
        </svg>
        {/* Score display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="font-bold text-neutral-900 dark:text-neutral-100 tabular-nums"
            style={{ fontSize: size * 0.28 }}
          >
            {displayScore}{isRange && <span className="text-[#2f5e50]">+</span>}
          </span>
        </div>
      </div>
      {/* Label */}
      <span className="text-[7px] md:text-[8px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider text-center leading-tight max-w-[56px] md:max-w-[68px]">
        {label}
      </span>
    </motion.div>
  );
}

export function PageSpeedScore() {
  const { t } = useTheme();
  const isMobile = useIsMobile();
  const lineRef = useRef<HTMLDivElement>(null);

  // Dynamically measure line width to reach exact viewport center
  const updateLineWidth = useCallback(() => {
    if (lineRef.current && !isMobile) {
      const parentEl = lineRef.current.parentElement;
      if (parentEl) {
        const parentRect = parentEl.getBoundingClientRect();
        const viewportCenter = window.innerWidth / 2;
        const lineWidth = viewportCenter - parentRect.left;
        lineRef.current.style.width = `${Math.max(0, lineWidth)}px`;
      }
    }
  }, [isMobile]);

  useEffect(() => {
    updateLineWidth();
    window.addEventListener("resize", updateLineWidth);
    return () => window.removeEventListener("resize", updateLineWidth);
  }, [updateLineWidth]);

  const size = isMobile ? 44 : 56;
  const sw = isMobile ? 2.5 : 3;
  
  const scores: Omit<ScoreRingProps, "size" | "strokeWidth" | "delay">[] = [
    { baseScore: 90,  isRange: true,  label: t.hero.pagespeed.performance },
    { baseScore: 95,  isRange: true,  label: t.hero.pagespeed.accessibility },
    { baseScore: 100, isRange: false, label: t.hero.pagespeed.bestPractices },
    { baseScore: 100, isRange: false, label: t.hero.pagespeed.seo },
  ];

  return (
    <motion.div
      className="mt-4 md:mt-6 pt-4 md:pt-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {/* Separator — full width mobile, extends to viewport center on desktop */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 h-px bg-neutral-200 dark:bg-[#1a1a1a] w-full md:w-0"
      />

      {/* Header */}
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        {/* Gauge icon */}
        <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#2f5e50] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12m-10 0a10 10 0 1 0 20 0 10 10 0 1 0 -20 0" opacity="0.3" />
          <path d="M12 12l4 -4" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
        <span className="text-[0.5rem] md:text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          {t.hero.pagespeed.label}
        </span>
        {/* Note badge: Mobile & Desktop */}
        <span className="text-[6px] md:text-[7px] font-bold uppercase tracking-wider text-[#2f5e50] bg-[#2f5e50]/8 px-1.5 py-0.5 border border-[#2f5e50]/15">
          {t.hero.pagespeed.note}
        </span>
      </div>
      
      {/* Score circles */}
      <div className="flex items-start gap-3.5 md:gap-6">
        {scores.map((item, idx) => (
          <ScoreRing
            key={item.label}
            baseScore={item.baseScore}
            isRange={item.isRange}
            label={item.label}
            delay={idx * 0.12}
            size={size}
            strokeWidth={sw}
          />
        ))}
      </div>

      {/* Live verification link */}
      <motion.a
        href={PAGESPEED_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-3 md:mt-4 text-[0.5rem] md:text-[9px] text-[#2f5e50] hover:text-[#234539] font-bold uppercase tracking-widest cursor-pointer group transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.4 }}
      >
        <span className="border-b border-[#2f5e50]/30 group-hover:border-[#2f5e50] transition-colors pb-px">
          {t.hero.pagespeed.verify}
        </span>
        <ArrowUpRight className="w-2.5 h-2.5 md:w-3 md:h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
      </motion.a>
    </motion.div>
  );
}