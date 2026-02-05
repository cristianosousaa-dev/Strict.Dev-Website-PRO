/**
 * Calcula o tamanho do container da esfera/animação
 * Mantém consistência entre NeuralCore e BuildAnimation
 * @returns Tamanho em pixels
 */
export function calculateSphereSize(): number {
  return Math.min(window.innerWidth * 0.25, 360); // PROPORCIONAL: ajustado para esfera menor
}

/**
 * Cor verde principal do Strict.Dev em formato RGB
 */
export const STRICT_GREEN = {
  r: 47,
  g: 94,
  b: 80,
  rgba: (alpha: number) => `rgba(47, 94, 80, ${alpha})`,
  hex: '#2f5e50'
};