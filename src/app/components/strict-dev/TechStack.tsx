import { motion } from "motion/react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useState, useEffect, useRef } from "react";

const stack = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", darkIcon: "" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", darkIcon: "" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000", darkIcon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", darkIcon: "" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", darkIcon: "" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E", darkIcon: "" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", darkIcon: "" },
  { name: "Database", icon: "https://img.icons8.com/color/96/database.png", darkIcon: "" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", darkIcon: "" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E", darkIcon: "" },
  { name: "HTML/CSS", icon: "https://cdn.simpleicons.org/html5/E34F26", darkIcon: "" },
];

// Doubled for seamless loop
const doubled = [...stack, ...stack];

export function TechStack() {
  const { t, isDarkMode } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Desktop check
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(timer); timer = setTimeout(check, 150); };
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(timer); window.removeEventListener("resize", onResize); };
  }, []);

  // ============================================================
  // MARQUEE: requestAnimationFrame + inline transform
  // No CSS keyframes, no Motion animate, no reduced-motion check
  // ============================================================
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    let start = 0;
    const pxPerSec = 55; // pixels per second

    const loop = (now: number) => {
      if (!start) start = now;
      const elapsed = (now - start) / 1000;

      // scrollWidth = total pixel width of all children (doubled items)
      // We scroll exactly half (= one full set of items), then wrap seamlessly
      const sw = track.scrollWidth;
      const half = sw / 2;

      if (half > 0) {
        const x = (elapsed * pxPerSec) % half;
        track.style.transform = "translate3d(" + (-x) + "px,0,0)";
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="relative bg-white dark:bg-[#0a0a0a] py-8 md:py-12 border-b border-neutral-100 dark:border-[#1a1a1a]"
      aria-labelledby="techstack-title"
      style={{ overflow: "hidden" }}
    >
      {/* Title */}
      <motion.div
        className="container mx-auto px-3 md:px-6 max-w-7xl mb-5 md:mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <span className="text-[#2f5e50] font-bold text-[0.5625rem] md:text-[10px] uppercase tracking-widest mb-1.5 md:mb-2 block">
          {t.techStack.label}
        </span>
        <h2
          id="techstack-title"
          className="text-base md:text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight max-w-2xl mx-auto leading-[1.3]"
        >
          {t.techStack.title}
        </h2>
      </motion.div>

      {/* Marquee container */}
      <div
        style={{ overflow: "hidden", position: "relative", padding: "1rem 0" }}
        role="region"
        aria-roledescription="carousel"
        aria-label={t.techStack.label}
      >
        {/* Track: inline-flex ensures width = total content width */}
        <div
          ref={trackRef}
          style={{
            display: "inline-flex",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {doubled.map((tech, idx) => {
            const iconSrc = isDarkMode && tech.darkIcon ? tech.darkIcon : tech.icon;
            return (
              <MarqueeCard
                key={`m-${tech.name}-${idx}`}
                name={tech.name}
                iconSrc={iconSrc}
                isDesktop={isDesktop}
              />
            );
          })}
        </div>
      </div>

      {/* Gradient Fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
        style={{
          background: isDarkMode
            ? "linear-gradient(to right, #0a0a0a, transparent)"
            : "linear-gradient(to right, #ffffff, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
        style={{
          background: isDarkMode
            ? "linear-gradient(to left, #0a0a0a, transparent)"
            : "linear-gradient(to left, #ffffff, transparent)",
        }}
      />
    </section>
  );
}

// Individual marquee card — motion.div only for desktop hover
function MarqueeCard({
  name,
  iconSrc,
  isDesktop,
}: {
  name: string;
  iconSrc: string;
  isDesktop: boolean;
}) {
  return (
    <motion.div
      style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isDesktop ? "0.75rem" : "0.625rem",
        padding: isDesktop ? "1rem" : "0.75rem",
        minWidth: isDesktop ? "160px" : "140px",
        border: "1px solid",
        borderColor: "var(--border)",
        backgroundColor: "var(--background)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        overflow: "hidden",
        position: "relative",
      }}
      {...(isDesktop && {
        whileHover: {
          y: -4,
          borderColor: "#2f5e50",
          boxShadow: "0 6px 20px rgba(47, 94, 80, 0.15)",
          transition: { duration: 0.15, ease: "easeOut" },
        },
      })}
    >
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        width="32"
        height="32"
        loading="lazy"
        style={{
          width: isDesktop ? "2rem" : "1.5rem",
          height: isDesktop ? "2rem" : "1.5rem",
          objectFit: "contain",
          filter: "grayscale(100%)",
          opacity: 0.6,
        }}
      />
      <span
        style={{
          fontSize: isDesktop ? "0.75rem" : "0.5625rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--muted-foreground)",
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}
