import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "/logo.png";
import { useIsMobile } from "../../../utils/responsive";
import { calculateSphereSize } from "../../../utils/canvas";
import { smoothScrollToElement } from "../../../utils/scroll";

interface BuildAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  language: "pt" | "en";
}

export function BuildAnimation({ isOpen, onClose, language }: BuildAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [containerSize, setContainerSize] = useState(0);
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  // Calcular tamanho IGUAL à esfera
  useEffect(() => {
    const updateSize = () => {
      setContainerSize(calculateSphereSize());
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Animação épica - 9 segundos de fluxo contínuo
  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      timeRef.current = 0;
      return;
    }

    const startTime = Date.now();
    const duration = 9000; // 9 segundos de fluxo puro

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      timeRef.current = elapsed / 1000;

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      }
    };

    // INICIA IMEDIATAMENTE sem delay!
    requestAnimationFrame(animate);
  }, [isOpen]);

  // Canvas épico com geometria Swiss
  useEffect(() => {
    if (!isOpen || !containerSize) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerSize * dpr;
    canvas.height = containerSize * dpr;
    canvas.style.width = `${containerSize}px`;
    canvas.style.height = `${containerSize}px`;
    ctx.scale(dpr, dpr);

    let animationFrame: number;
    const center = containerSize / 2;

    const render = () => {
      ctx.clearRect(0, 0, containerSize, containerSize);

      const p = progress / 100;
      const time = timeRef.current;

      // === FASE 1: EXPANSÃO GEOMÉTRICA INSTITUCIONAL (0-20%) ===
      // Swiss Design puro: Linhas radiais → Grid preciso → Órbitas
      if (p >= 0 && p < 0.20) {
        const alpha = Math.min(1, p / 0.03);
        const phaseProgress = p / 0.20;
        
        // Fade out suave global a partir de 55% (11% global)
        let globalAlpha = alpha;
        if (phaseProgress > 0.55) {
          globalAlpha *= 1 - ((phaseProgress - 0.55) / 0.45); // Fade out ligeiramente mais cedo
        }
        
        // === LINHAS RADIAIS PRECISAS (0-100%) ===
        const numLines = 12; // 12 linhas - divisão perfeita
        
        for (let i = 0; i < numLines; i++) {
          const angle = (Math.PI * 2 * i) / numLines;
          
          // Linhas expandem do centro ATÉ à órbita mais externa dos pontos
          // Órbitas: 0.25, 0.47, 0.69 do raio
          const maxLength = center * 0.69; // Até a 3ª órbita (última órbita de pontos)
          const currentLength = maxLength * Math.min(1, phaseProgress * 1.5);
          
          const x1 = center;
          const y1 = center;
          const x2 = center + Math.cos(angle) * currentLength;
          const y2 = center + Math.sin(angle) * currentLength;
          
          // Opacidade com fade out suave
          const lineOpacity = globalAlpha * 0.2;
          
          if (lineOpacity > 0.01) {
            ctx.strokeStyle = `rgba(47, 94, 80, ${lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
        
        // === CÍRCULOS CONCÊNTRICOS (30-100%) ===
        if (phaseProgress > 0.3) {
          const circleProgress = (phaseProgress - 0.3) / 0.7;
          const numCircles = 5;
          
          for (let i = 0; i < numCircles; i++) {
            const radius = center * (0.15 + i * 0.15);
            const circleDelay = i * 0.12;
            const individualProgress = Math.max(0, Math.min(1, (circleProgress - circleDelay) / (1 - circleDelay)));
            
            // Opacidade com fade out suave
            const circleOpacity = globalAlpha * individualProgress * 0.15;
            
            if (circleOpacity > 0.01 && individualProgress > 0) {
              ctx.strokeStyle = `rgba(47, 94, 80, ${circleOpacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(center, center, radius * individualProgress, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }
        
        // === PONTOS NAS INTERSEÇÕES (50-100%) ===
        if (phaseProgress > 0.5) {
          const pointProgress = (phaseProgress - 0.5) / 0.5;
          
          // 3 órbitas × 12 posições = 36 pontos
          for (let orbit = 0; orbit < 3; orbit++) {
            const orbitRadius = center * (0.25 + orbit * 0.22);
            const pointsInOrbit = 12;
            
            for (let i = 0; i < pointsInOrbit; i++) {
              const angle = (Math.PI * 2 * i) / pointsInOrbit;
              const x = center + Math.cos(angle) * orbitRadius;
              const y = center + Math.sin(angle) * orbitRadius;
              
              const pointDelay = (orbit * pointsInOrbit + i) * 0.015;
              const individualProgress = Math.max(0, Math.min(1, (pointProgress - pointDelay) / (1 - pointDelay)));
              
              if (individualProgress > 0) {
                const pointSize = 2 * individualProgress;
                const pointOpacity = globalAlpha * individualProgress * 0.6;
                
                if (pointOpacity > 0.01) {
                  // Ponto sólido
                  ctx.fillStyle = `rgba(47, 94, 80, ${pointOpacity})`;
                  ctx.beginPath();
                  ctx.arc(x, y, pointSize, 0, Math.PI * 2);
                  ctx.fill();
                  
                  // Glow sutil
                  ctx.fillStyle = `rgba(47, 94, 80, ${pointOpacity * 0.2})`;
                  ctx.beginPath();
                  ctx.arc(x, y, pointSize * 3, 0, Math.PI * 2);
                  ctx.fill();
                }
              }
            }
          }
        }
        
        // === ÓRBITAS FINAIS APARECEM (70-100%) ===
        if (phaseProgress > 0.7) {
          const orbitProgress = (phaseProgress - 0.7) / 0.3;
          
          for (let orbit = 0; orbit < 3; orbit++) {
            const orbitRadius = center * (0.25 + orbit * 0.22);
            const orbitOpacity = globalAlpha * orbitProgress * 0.12;
            
            if (orbitOpacity > 0.01) {
              ctx.strokeStyle = `rgba(47, 94, 80, ${orbitOpacity})`;
              ctx.lineWidth = 1;
              ctx.setLineDash([4, 4]);
              ctx.beginPath();
              ctx.arc(center, center, orbitRadius, 0, Math.PI * 2);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }
        }
        
        // === NÚCLEO CENTRAL MINIMALISTA (0-100%) ===
        const coreSize = 3;
        const coreOpacity = globalAlpha * 0.5;
        
        if (coreOpacity > 0.01) {
          ctx.fillStyle = `rgba(47, 94, 80, ${coreOpacity})`;
          ctx.beginPath();
          ctx.arc(center, center, coreSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // === FASE 2: ÓRBITAS CIRCULARES (14-60%) - CROSS-FADE SUAVE COM FASE 1 ===
      if (p >= 0.14 && p < 0.60) {
        const phase2Start = 0.14;
        const phase2End = 0.50;
        const phase2FadeOut = 0.55;
        
        let alpha = 1;
        if (p < phase2Start + 0.06) {
          // Fade in suave de 6% (14%-20%)
          alpha = (p - phase2Start) / 0.06;
        } else if (p > phase2End) {
          // Fade out suave
          alpha = 1 - ((p - phase2End) / (phase2FadeOut - phase2End));
        }
        
        const orbitProgress = Math.min(1, (p - phase2Start) / (phase2End - phase2Start));
        
        // 3 órbitas com partículas
        for (let orbit = 0; orbit < 3; orbit++) {
          const orbitRadius = center * (0.25 + orbit * 0.22);
          const orbitSpeed = 0.35 + orbit * 0.18; // AINDA MAIS LENTO: era 0.5 + orbit * 0.25
          const particlesInOrbit = 10 + orbit * 4;
          
          for (let i = 0; i < particlesInOrbit; i++) {
            const angle = (Math.PI * 2 * i) / particlesInOrbit + time * orbitSpeed;
            const x = center + Math.cos(angle) * orbitRadius;
            const y = center + Math.sin(angle) * orbitRadius;
            
            const pulse = Math.sin(time * 1.5 + i + orbit) * 0.25 + 0.75; // AINDA MAIS LENTO: era time * 2
            const opacity = alpha * pulse * 0.7;
            const size = Math.max(0.5, (1.5 + Math.sin(time * 1.3 + i) * 0.5) * pulse); // AINDA MAIS LENTO: era time * 1.8
            
            if (opacity > 0.01 && size > 0) {
              // Glow amplo
              ctx.fillStyle = `rgba(47, 94, 80, ${opacity * 0.15})`;
              ctx.beginPath();
              ctx.arc(x, y, size * 4, 0, Math.PI * 2);
              ctx.fill();
              
              // Partícula
              ctx.fillStyle = `rgba(47, 94, 80, ${opacity})`;
              ctx.beginPath();
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          
          // Linha orbital tracejada
          const lineOpacity = alpha * 0.12;
          if (lineOpacity > 0.01) {
            ctx.strokeStyle = `rgba(47, 94, 80, ${lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.arc(center, center, orbitRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
        
        // === NÚCLEO CENTRAL PERSISTENTE (igual à Fase 1) ===
        const coreSize = 3;
        const coreOpacity = alpha * 0.5;
        
        if (coreOpacity > 0.01) {
          ctx.fillStyle = `rgba(47, 94, 80, ${coreOpacity})`;
          ctx.beginPath();
          ctx.arc(center, center, coreSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // === FASE 3: REDE NEURAL (45-75%) - OTIMIZADA ===
      if (p >= 0.45 && p < 0.80) {
        const phase3Start = 0.45;
        const phase3End = 0.70;
        const phase3FadeOut = 0.75;
        
        let alpha = 1;
        if (p < phase3Start + 0.10) {
          alpha = (p - phase3Start) / 0.10;
        } else if (p > phase3End) {
          alpha = 1 - ((p - phase3End) / (phase3FadeOut - phase3End));
        }
        
        const networkProgress = Math.min(1, (p - phase3Start) / (phase3End - phase3Start));
        
        // Pontos da rede hexagonal - OTIMIZADO: 3 layers nas MESMAS POSIÇÕES da Fase 2
        const points: { x: number; y: number; delay: number }[] = [];
        const layers = 3;
        
        for (let layer = 0; layer < layers; layer++) {
          // MESMAS órbitas da Fase 2: 0.25, 0.47, 0.69
          const radius = center * (0.25 + layer * 0.22);
          const numPoints = 6 + layer * 4;
          
          for (let i = 0; i < numPoints; i++) {
            const angle = (Math.PI * 2 * i) / numPoints + time * 0.25;
            points.push({
              x: center + Math.cos(angle) * radius,
              y: center + Math.sin(angle) * radius,
              delay: layer * 0.15 + i * 0.01
            });
          }
        }
        
        // Conexões entre pontos próximos - SUPER OTIMIZADO
        const maxDistance = center * 0.35;
        const maxConnectionsPerPoint = 3;
        
        for (let i = 0; i < points.length; i++) {
          let connectionsFound = 0;
          
          for (let j = i + 1; j < points.length && connectionsFound < maxConnectionsPerPoint; j++) {
            const dx = points[j].x - points[i].x;
            const dy = points[j].y - points[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
              const connectionProgress = Math.max(0, Math.min(1, (networkProgress - (i + j) * 0.005) * 2));
              const lineOpacity = alpha * connectionProgress * (1 - distance / maxDistance) * 0.25;
              
              if (lineOpacity > 0.01) {
                ctx.strokeStyle = `rgba(47, 94, 80, ${lineOpacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
                
                connectionsFound++;
              }
            }
          }
        }
        
        // Nós da rede
        points.forEach((point, i) => {
          const nodeProgress = Math.max(0, Math.min(1, (networkProgress - point.delay) * 3));
          const pulse = Math.sin(time * 3 + i * 0.15) * 0.3 + 0.7;
          const nodeOpacity = alpha * nodeProgress * pulse * 0.75;
          const nodeSize = Math.max(0.5, (2 + pulse * 0.5) * nodeProgress);
          
          if (nodeOpacity > 0.01 && nodeSize > 0) {
            // Glow
            ctx.fillStyle = `rgba(47, 94, 80, ${nodeOpacity * 0.2})`;
            ctx.beginPath();
            ctx.arc(point.x, point.y, nodeSize * 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Nó
            ctx.fillStyle = `rgba(47, 94, 80, ${nodeOpacity})`;
            ctx.beginPath();
            ctx.arc(point.x, point.y, nodeSize, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        
        // === NÚCLEO CENTRAL PERSISTENTE (igual às Fases 1 e 2) ===
        const coreSize = 3;
        const coreOpacity = alpha * 0.5;
        
        if (coreOpacity > 0.01) {
          // Glow amplo (igual à Fase 2)
          ctx.fillStyle = `rgba(47, 94, 80, ${coreOpacity * 0.25})`;
          ctx.beginPath();
          ctx.arc(center, center, coreSize * 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Glow médio
          ctx.fillStyle = `rgba(47, 94, 80, ${coreOpacity * 0.4})`;
          ctx.beginPath();
          ctx.arc(center, center, coreSize * 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Núcleo sólido
          ctx.fillStyle = `rgba(47, 94, 80, ${coreOpacity})`;
          ctx.beginPath();
          ctx.arc(center, center, coreSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // === FASE 4: ESPIRAL CONVERGENTE (65-85%) ===
      if (p >= 0.65 && p < 0.88) {
        const phase4Start = 0.65;
        const phase4End = 0.82;
        const phase4FadeOut = 0.85;
        
        let alpha = 1;
        if (p < phase4Start + 0.08) {
          alpha = (p - phase4Start) / 0.08;
        } else if (p > phase4End) {
          alpha = 1 - ((p - phase4End) / (phase4FadeOut - phase4End));
        }
        
        const spiralProgress = Math.min(1, (p - phase4Start) / (phase4End - phase4Start));
        
        // Espiral de Fibonacci
        const turns = 4;
        const pointsPerTurn = 12;
        const totalPoints = turns * pointsPerTurn;
        
        for (let i = 0; i < totalPoints; i++) {
          const t = i / totalPoints;
          const angle = t * turns * Math.PI * 2 + time * 1.5;
          const maxRadius = center * 0.85;
          const radiusFactor = (1 - spiralProgress) * (1 - t);
          const radius = maxRadius * radiusFactor;
          
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          
          const pointProgress = Math.max(0, Math.min(1, (spiralProgress - t * 0.3) * 3));
          const pulse = Math.sin(time * 2.5 + i * 0.08) * 0.25 + 0.75;
          const opacity = alpha * pointProgress * pulse * 0.6;
          const size = Math.max(0.5, (1.5 + pulse * 0.5) * pointProgress);
          
          if (opacity > 0.01 && size > 0) {
            // Trail
            ctx.fillStyle = `rgba(47, 94, 80, ${opacity * 0.25})`;
            ctx.beginPath();
            ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Ponto
            ctx.fillStyle = `rgba(47, 94, 80, ${opacity})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Núcleo central crescendo
        const coreGrowth = spiralProgress;
        const coreSize = Math.max(0.5, coreGrowth * 18);
        const coreOpacity = alpha * coreGrowth * 0.85;
        
        if (coreSize > 0 && coreOpacity > 0.01) {
          // Auras pulsantes
          for (let i = 0; i < 5; i++) {
            const auraPulse = Math.sin(time * 2.5 - i * 0.4) * 0.2 + 0.8;
            const auraSize = Math.max(0.5, coreSize + (i + 1) * 10 * auraPulse);
            const auraOpacity = coreOpacity * (1 - i * 0.18) * 0.12;
            
            if (auraSize > 0 && auraOpacity > 0.01) {
              ctx.strokeStyle = `rgba(47, 94, 80, ${auraOpacity})`;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(center, center, auraSize, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
          
          // Núcleo
          ctx.fillStyle = `rgba(47, 94, 80, ${coreOpacity})`;
          ctx.beginPath();
          ctx.arc(center, center, coreSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // === FASE 5: CONVERGÊNCIA PARA O CENTRO (80-90%) ===
      if (p >= 0.80 && p < 0.90) {
        const phase5Start = 0.80;
        const phase5End = 0.88;
        
        let alpha = 1;
        if (p < phase5Start + 0.03) {
          alpha = (p - phase5Start) / 0.03;
        } else if (p > phase5End) {
          alpha = 1 - ((p - phase5End) / 0.02);
        }
        
        const convergenceProgress = (p - phase5Start) / (phase5End - phase5Start);
        
        // Espiral convergindo
        const turns = 3;
        const pointsPerTurn = 15;
        const totalPoints = turns * pointsPerTurn;
        
        for (let i = 0; i < totalPoints; i++) {
          const t = i / totalPoints;
          const angle = t * turns * Math.PI * 2 - time * 0.8;
          
          const maxRadius = center * 0.75;
          const radiusFactor = (1 - convergenceProgress) * (1 - t * 0.5);
          const radius = maxRadius * radiusFactor;
          
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          
          const pointOpacity = alpha * (1 - t * 0.3) * 0.7;
          const size = Math.max(0.5, (2 - t) * (1 - convergenceProgress * 0.5));
          
          if (pointOpacity > 0.01 && size > 0) {
            ctx.fillStyle = `rgba(47, 94, 80, ${pointOpacity * 0.2})`;
            ctx.beginPath();
            ctx.arc(x, y, size * 3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = `rgba(47, 94, 80, ${pointOpacity})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Núcleo central crescendo
        const coreGrowth = convergenceProgress;
        const coreSize = Math.max(0, coreGrowth * center * 0.12);
        const coreOpacity = alpha * Math.min(1, coreGrowth * 1.2);
        
        if (coreSize > 0 && coreOpacity > 0.01) {
          const gradient = ctx.createRadialGradient(
            center, center, 0,
            center, center, coreSize * 2
          );
          gradient.addColorStop(0, `rgba(47, 94, 80, ${coreOpacity * 0.9})`);
          gradient.addColorStop(0.5, `rgba(47, 94, 80, ${coreOpacity * 0.5})`);
          gradient.addColorStop(1, `rgba(47, 94, 80, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(center, center, coreSize * 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = `rgba(47, 94, 80, ${coreOpacity})`;
          ctx.beginPath();
          ctx.arc(center, center, coreSize, 0, Math.PI * 2);
          ctx.fill();
          
          for (let i = 0; i < 3; i++) {
            const ringDelay = i * 0.15;
            const ringProgress = Math.max(0, Math.min(1, (convergenceProgress - ringDelay) / (1 - ringDelay)));
            const ringRadius = coreSize * (1.5 + i * 0.4) * ringProgress;
            const ringOpacity = coreOpacity * (1 - ringProgress) * (1 - i * 0.25) * 0.5;
            
            if (ringRadius > 0 && ringOpacity > 0.01) {
              ctx.strokeStyle = `rgba(47, 94, 80, ${ringOpacity})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(center, center, ringRadius, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isOpen, progress, containerSize]);

  const texts = {
    pt: {
      building: "Construindo...",
      offer: "Primeira Consultoria Gratuita",
      cta: "Começar Agora"
    },
    en: {
      building: "Building...",
      offer: "First Free Consultancy",
      cta: "Get Started"
    }
  };

  const t = texts[language];

  if (!containerSize) return null;
  if (isMobile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none flex items-center justify-end pr-8 lg:pr-24 z-10"
        >
          <motion.div
            className="relative pointer-events-auto"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0 }}
            style={{ 
              width: containerSize,
              height: containerSize,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 border border-neutral-200 dark:border-neutral-800 pointer-events-none" />

            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {progress >= 87 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 bg-white/98 dark:bg-neutral-950/98 backdrop-blur-xl pointer-events-auto"
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 z-50 group cursor-pointer flex items-center justify-center border border-neutral-300 dark:border-neutral-700 hover:border-[#2f5e50] transition-all duration-300 bg-white dark:bg-neutral-950"
                  style={{
                    width: containerSize * 0.075,
                    height: containerSize * 0.075,
                  }}
                >
                  <svg 
                    width="40%" 
                    height="40%" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="text-neutral-500 dark:text-neutral-400 group-hover:text-[#2f5e50] transition-colors duration-300"
                    strokeWidth="2"
                    strokeLinecap="square"
                  >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </svg>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 border-2 border-[#2f5e50]" />
                  </div>
                </motion.button>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                  className="relative"
                >
                  <motion.img 
                    src={logo} 
                    alt="Strict.Dev" 
                    className="w-auto object-contain"
                    style={{ height: containerSize * 0.35 }}
                  />
                </motion.div>

                <motion.div className="relative w-full flex justify-center items-center">
                  <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-[#2f5e50] to-transparent relative"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: containerSize * 0.5, opacity: 0.6 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#2f5e50]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    />
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#2f5e50]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-center relative"
                >
                  <p 
                    className="font-bold uppercase tracking-[0.3em] text-[#2f5e50] relative z-10"
                    style={{ fontSize: containerSize * 0.028 }}
                  >
                    {t.offer}
                  </p>
                  <div className="absolute inset-0 blur-2xl opacity-12 bg-[#2f5e50]" />
                  <div className="absolute inset-0 blur-xl opacity-8 bg-[#2f5e50]" />
                </motion.div>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group overflow-hidden cursor-pointer z-50"
                  style={{
                    padding: `${containerSize * 0.022}px ${containerSize * 0.055}px`,
                  }}
                  onClick={() => {
                    smoothScrollToElement('#contact');
                    onClose();
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2f5e50] via-[#2a5649] to-[#234539] pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none" />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                  />
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3d7a66]/50 via-transparent to-transparent" />
                    <div className="absolute -inset-1 bg-[#2f5e50]/20 blur-xl" />
                  </div>
                  
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-white/30 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-white/30 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-white/30 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-white/30 pointer-events-none" />
                  
                  <span 
                    className="relative z-10 font-bold uppercase tracking-[0.3em] text-white drop-shadow-lg pointer-events-none"
                    style={{ fontSize: containerSize * 0.020 }}
                  >
                    {t.cta}
                  </span>
                  
                  <div className="absolute -inset-1 bg-[#2f5e50]/40 blur-2xl -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ 
                    duration: 3.5,
                    times: [0, 0.3, 0.7, 1],
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex items-center gap-2"
                  style={{ fontSize: containerSize * 0.020 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2f5e50]" />
                  <span className="text-[#2f5e50] uppercase tracking-[0.25em] font-bold">
                    {language === 'pt' ? 'Clique para começar' : 'Click to start'}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2f5e50]" />
                </motion.div>
              </motion.div>
            )}

            {progress < 85 && (
              <motion.div
                className="absolute bottom-6 left-6 uppercase tracking-[0.3em] text-[#2f5e50] font-mono font-bold"
                style={{ fontSize: containerSize * 0.02 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {t.building}
              </motion.div>
            )}

            {progress < 85 && (
              <div className="absolute bottom-0 left-0 right-0">
                <div className="h-0.5 bg-neutral-200 dark:bg-neutral-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#2f5e50] to-[#3d7a66]"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            )}

            {[
              { pos: 'top-0 left-0', border: 'border-t-2 border-l-2' },
              { pos: 'top-0 right-0', border: 'border-t-2 border-r-2' },
              { pos: 'bottom-0 left-0', border: 'border-b-2 border-l-2' },
              { pos: 'bottom-0 right-0', border: 'border-b-2 border-r-2' },
            ].map((corner, i) => (
              <motion.div
                key={i}
                className={`absolute ${corner.pos} ${corner.border} border-[#2f5e50]`}
                style={{
                  width: containerSize * 0.04,
                  height: containerSize * 0.04
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}