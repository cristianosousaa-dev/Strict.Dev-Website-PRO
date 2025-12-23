import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Plugin para resolver figma:asset durante o build
const figmaAssetPlugin = () => {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        // Retorna um ID virtual que será resolvido no load
        return '\0' + id;
      }
      return null;
    },
    load(id: string) {
      if (id.startsWith('\0figma:asset/')) {
        // Retorna um data URL SVG do logo Strict.Dev
        const logoSvg = `<svg width="200" height="70" viewBox="0 0 200 70" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="70" fill="white"/>
          <text x="20" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#0a0a0a" letter-spacing="-0.5">STRICT</text>
          <text x="110" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="300" fill="#0a0a0a" letter-spacing="0.5" opacity="0.7">.DEV</text>
          <rect x="20" y="45" width="60" height="2" fill="#2f5e50"/>
        </svg>`;
        
        const base64 = Buffer.from(logoSvg).toString('base64');
        const dataUrl = `data:image/svg+xml;base64,${base64}`;
        
        return `export default "${dataUrl}";`;
      }
      return null;
    }
  };
};

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    figmaAssetPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
})
