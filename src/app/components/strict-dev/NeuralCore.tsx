import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../../../contexts/ThemeContext";
import { calculateSphereSize } from "../../../utils/canvas";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx?: number;
  vy?: number;
}

interface NeuralCoreProps {
  onCoreClick?: () => void;
  shouldHide?: boolean;
  language?: "pt" | "en";
}

export function NeuralCore({ onCoreClick, shouldHide = false, language = "en" }: NeuralCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coreButtonRef = useRef<HTMLButtonElement>(null);
  const { isDarkMode } = useTheme();
  const particlesRef = useRef<Particle[]>([]);
  const rotationRef = useRef(0);
  const animationRef = useRef<number>();
  const pulseRef = useRef(0);
  const explosionProgressRef = useRef(0);
  const isExplodingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const hoverScaleRef = useRef(1);
  const [isHovered, setIsHovered] = useState(false);

  // Reset quando shouldHide muda para false
  useEffect(() => {
    if (!shouldHide) {
      explosionProgressRef.current = 0;
      isExplodingRef.current = false;
    }
  }, [shouldHide]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Canvas size usando utilitário
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const size = calculateSphereSize();
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(dpr, dpr);
    };
    updateSize();

    // Create minimalist sphere with Fibonacci distribution
    const particleCount = 135; // BALANCEADO: 135 pontos (sweet spot)
    const radius = Math.min(window.innerWidth * 0.11, 170); // MENOR: 0.13→0.11, 200→170
    const particles: Particle[] = [];

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < particleCount; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Velocidades de explosão
      const speed = 3 + Math.random() * 2;
      const vx = (x / radius) * speed;
      const vy = (y / radius) * speed;

      particles.push({ x, y, z, vx, vy });
    }
    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      const size = canvas.width / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;

      // Explosão
      if (isExplodingRef.current) {
        explosionProgressRef.current += 0.02;
        
        // Fade out completo em 1 segundo
        if (explosionProgressRef.current >= 1) {
          // Para a animação
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
          return;
        }
      }

      // Slow rotation - ULTRA LENTO
      rotationRef.current += 0.0003;

      // Pulsação SUAVE E LENTA - como respiração orgânica
      pulseRef.current += 0.015; // REDUZIDO: 0.05 → 0.015 (3x mais lento!)

      // Rotate particles
      const rotatedParticles = particlesRef.current.map(p => {
        let x = p.x;
        let y = p.y;
        let z = p.z;

        // Se está explodindo, mover partículas
        if (isExplodingRef.current && p.vx && p.vy) {
          p.x += p.vx;
          p.y += p.vy;
          x = p.x;
          y = p.y;
        }

        // Rotação normal
        const rotatedX = x * Math.cos(rotationRef.current) - z * Math.sin(rotationRef.current);
        const rotatedZ = z * Math.cos(rotationRef.current) + x * Math.sin(rotationRef.current);
        
        return { x: rotatedX, y, z: rotatedZ };
      });

      // Sort by depth
      const sortedParticles = [...rotatedParticles].sort((a, b) => a.z - b.z);

      // Opacidade global durante explosão
      const globalOpacity = isExplodingRef.current 
        ? 1 - explosionProgressRef.current
        : 1;

      // Draw connections first (minimalist lines)
      const connectionDistance = radius * 0.4;
      ctx.lineWidth = 0.8;

      sortedParticles.forEach((p1, i) => {
        let connections = 0;
        const maxConnections = 5;

        for (let j = i + 1; j < sortedParticles.length && connections < maxConnections; j++) {
          const p2 = sortedParticles[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < connectionDistance) {
            const px1 = centerX + p1.x;
            const py1 = centerY + p1.y;
            const px2 = centerX + p2.x;
            const py2 = centerY + p2.y;

            const opacity = (1 - distance / connectionDistance) * 0.6 * globalOpacity;
            ctx.strokeStyle = isDarkMode 
              ? `rgba(47, 94, 80, ${opacity * 0.35})`
              : `rgba(47, 94, 80, ${opacity * 0.25})`;

            ctx.beginPath();
            ctx.moveTo(px1, py1);
            ctx.lineTo(px2, py2);
            ctx.stroke();

            connections++;
          }
        }
      });

      // Draw minimalist particles
      sortedParticles.forEach((p) => {
        const projectedX = centerX + p.x;
        const projectedY = centerY + p.y;

        // Depth-based size (subtle)
        const depthScale = 0.6 + (p.z / radius + 1) * 0.2;
        const size = 2 * depthScale;
        const opacity = (0.5 + depthScale * 0.4) * globalOpacity;

        // Simple dot
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, size, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode 
          ? `rgba(47, 94, 80, ${opacity})` 
          : `rgba(47, 94, 80, ${opacity * 0.8})`;
        ctx.fill();
      });

      // PONTO LUMINOSO CENTRAL - só se não estiver explodindo
      if (!isExplodingRef.current) {
        const coreSize = 5;
        const pulse = Math.sin(pulseRef.current) * 0.1 + 1;
        
        // SMOOTH TRANSITION para o hover - LERP (Linear Interpolation)
        const targetScale = isHoveredRef.current ? 1.5 : 1;
        const lerpSpeed = 0.12;
        hoverScaleRef.current += (targetScale - hoverScaleRef.current) * lerpSpeed;
        const hoverScale = hoverScaleRef.current;
        
        // Brilho SUTIL (não exagerado)
        const brightnessBump = (hoverScale - 1) * 0.4; // Apenas +20% no máximo
        
        // Outer glow - TAMANHO FIXO, sem crescer!
        const outerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize * 8);
        outerGlow.addColorStop(0, isDarkMode 
          ? `rgba(120, 200, 180, ${(0.5 + brightnessBump)})` 
          : `rgba(80, 150, 120, ${(0.4 + brightnessBump)})`);
        outerGlow.addColorStop(0.5, isDarkMode 
          ? 'rgba(47, 94, 80, 0.25)' 
          : 'rgba(47, 94, 80, 0.2)');
        outerGlow.addColorStop(1, 'rgba(47, 94, 80, 0)');

        ctx.beginPath();
        ctx.arc(centerX, centerY, coreSize * 8, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Inner glow - TAMANHO FIXO, sem crescer!
        const innerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize * 3);
        innerGlow.addColorStop(0, isDarkMode 
          ? `rgba(200, 255, 220, ${(0.8 + brightnessBump)})` 
          : `rgba(150, 220, 180, ${(0.7 + brightnessBump)})`);
        innerGlow.addColorStop(0.5, isDarkMode 
          ? 'rgba(120, 200, 180, 0.5)' 
          : 'rgba(80, 150, 120, 0.4)');
        innerGlow.addColorStop(1, 'rgba(47, 94, 80, 0)');

        ctx.beginPath();
        ctx.arc(centerX, centerY, coreSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = innerGlow;
        ctx.fill();

        // Core center - APENAS ESTE CRESCE!
        const coreGradient = ctx.createRadialGradient(
          centerX - coreSize * 0.3 * hoverScale,
          centerY - coreSize * 0.3 * hoverScale,
          0,
          centerX,
          centerY,
          coreSize * pulse * hoverScale
        );
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        coreGradient.addColorStop(0.5, isDarkMode 
          ? 'rgba(200, 255, 220, 0.8)' 
          : 'rgba(150, 220, 180, 0.7)');
        coreGradient.addColorStop(1, isDarkMode 
          ? 'rgba(47, 94, 80, 0.7)' 
          : 'rgba(47, 94, 80, 0.6)');

        ctx.beginPath();
        ctx.arc(centerX, centerY, coreSize * pulse * hoverScale, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(document.body);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [isDarkMode, shouldHide]); // Adiciona shouldHide para re-renderizar quando voltar

  // Trigger explosão quando shouldHide muda
  useEffect(() => {
    if (shouldHide && !isExplodingRef.current) {
      isExplodingRef.current = true;
      explosionProgressRef.current = 0;
    } else if (!shouldHide && isExplodingRef.current) {
      // Reset quando a esfera volta
      isExplodingRef.current = false;
      explosionProgressRef.current = 0;
    }
  }, [shouldHide]);

  return (
    <AnimatePresence mode="wait">
      {!shouldHide && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.15,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.19, 1, 0.22, 1]
          }}
          className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-end pr-8 lg:pr-24"
        >
          <div className="relative pointer-events-auto">
            <canvas
              ref={canvasRef}
              className="opacity-50 pointer-events-none"
            />
            
            {/* Botão invisível para hover - SEM círculo */}
            <button
              ref={coreButtonRef}
              onClick={() => {
                isExplodingRef.current = true;
                explosionProgressRef.current = 0;
                onCoreClick?.();
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full pointer-events-auto cursor-pointer z-50"
              style={{
                background: 'transparent',
              }}
              aria-label="Start experience"
              onMouseEnter={() => {
                isHoveredRef.current = true;
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
                setIsHovered(false);
              }}
            />

            {/* Sistema de indicadores integrado ao core - Swiss precision */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              {/* Anel FIXO ao redor do core - SEM PULSAÇÃO */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-[#2f5e50] dark:border-[#3d7a66] opacity-30"
              />

              {/* Texto integrado - posicionado de forma precisa - SEM PULSAÇÃO */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none opacity-70"
                style={{ marginTop: '68px' }}
              >
                <div className="flex items-center gap-2">
                  {/* Marcador esquerdo */}
                  <div className="w-2 h-px bg-[#2f5e50] dark:bg-[#3d7a66]" />
                  
                  {/* Texto minimalista */}
                  <span className="text-[#2f5e50] dark:text-[#3d7a66] uppercase tracking-[0.4em] font-bold text-[9px] whitespace-nowrap">
                    {language === 'pt' ? 'Iniciar' : 'Start'}
                  </span>
                  
                  {/* Marcador direito */}
                  <div className="w-2 h-px bg-[#2f5e50] dark:bg-[#3d7a66]" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}