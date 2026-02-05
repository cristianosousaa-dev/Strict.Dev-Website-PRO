import { motion } from "motion/react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useState, useEffect } from "react";

const stack = [
    { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000" },
    { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
    { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    { name: "Database", icon: "https://img.icons8.com/color/96/database.png" }, 
    { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
    { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
    { name: "HTML/CSS", icon: "https://cdn.simpleicons.org/html5/E34F26" },
];

export function TechStack() {
  const { t } = useTheme();
  
  // Detect if desktop (>= 768px) to enable hover animations
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);
  
  return (
    <section className="relative bg-white dark:bg-[#0a0a0a] py-8 md:py-12 overflow-hidden border-b border-neutral-100 dark:border-[#1a1a1a]">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl mb-5 md:mb-8 text-center">
            <span className="text-[#2f5e50] font-bold text-[0.5625rem] md:text-[10px] uppercase tracking-widest mb-1.5 md:mb-2 block">
                {t.techStack.label}
            </span>
            <h2 className="text-base md:text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight max-w-2xl mx-auto leading-[1.3]">
                {t.techStack.title}
            </h2>
        </div>

        <div className="relative flex overflow-x-hidden py-4">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...stack, ...stack, ...stack].map((tech, idx) => (
                    <motion.div 
                        key={`first-${tech.name}-${idx}`}
                        className="relative flex items-center justify-center gap-2.5 md:gap-3 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] p-3 md:p-4 min-w-[140px] md:min-w-[160px] group shadow-sm overflow-hidden md:hover:!border-[#2f5e50] will-change-transform"
                        {...(isDesktop && {
                          whileHover: { 
                            y: -4, 
                            boxShadow: "0 6px 20px rgba(47, 94, 80, 0.15)",
                            transition: { duration: 0.15, ease: 'easeOut' }
                          }
                        })}
                    >
                        <img 
                            src={tech.icon} 
                            alt={tech.name}
                            className="w-6 h-6 md:w-8 md:h-8 object-contain filter grayscale opacity-60 md:group-hover:grayscale-0 md:group-hover:opacity-100 md:transition-all md:duration-150"
                        />
                        <span 
                          className="text-[0.5625rem] md:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 md:group-hover:text-neutral-900 md:dark:group-hover:text-neutral-100 md:transition-colors md:duration-150"
                        >
                            {tech.name}
                        </span>
                    </motion.div>
                ))}
            </div>
            
            {/* Duplicate for seamless loop */}
            <div className="absolute top-4 flex animate-marquee2 whitespace-nowrap">
                 {[...stack, ...stack, ...stack].map((tech, idx) => (
                    <motion.div 
                        key={`second-${tech.name}-${idx}`}
                        className="relative flex items-center justify-center gap-2.5 md:gap-3 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#1a1a1a] p-3 md:p-4 min-w-[140px] md:min-w-[160px] group shadow-sm overflow-hidden md:hover:!border-[#2f5e50] will-change-transform"
                        {...(isDesktop && {
                          whileHover: { 
                            y: -4, 
                            boxShadow: "0 6px 20px rgba(47, 94, 80, 0.15)",
                            transition: { duration: 0.15, ease: 'easeOut' }
                          }
                        })}
                    >
                        <img 
                            src={tech.icon} 
                            alt={tech.name}
                            className="w-6 h-6 md:w-8 md:h-8 object-contain filter grayscale opacity-60 md:group-hover:grayscale-0 md:group-hover:opacity-100 md:transition-all md:duration-150"
                        />
                        <span 
                          className="text-[0.5625rem] md:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 md:group-hover:text-neutral-900 md:dark:group-hover:text-neutral-100 md:transition-colors md:duration-150"
                        >
                            {tech.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Gradient Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10"></div>
        
        <style>{`
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-100%); }
            }
            @keyframes marquee2 {
                0% { transform: translateX(100%); }
                100% { transform: translateX(0); }
            }
            .animate-marquee {
                animation: marquee 80s linear infinite;
                will-change: transform;
            }
            .animate-marquee2 {
                animation: marquee2 80s linear infinite;
                will-change: transform;
            }
        `}</style>
    </section>
  );
}