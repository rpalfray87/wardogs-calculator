import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Deux cibles de build depuis la meme base de code :
//  - Electron charge les fichiers en file://  -> chemins relatifs, pas de service worker
//  - GitHub Pages sert le site sous un sous-chemin -> base absolue
const isElectron = process.env.BUILD_TARGET === 'electron';
const repoBase = process.env.PAGES_BASE ?? '/artillery-calculator-wd/';

export default defineConfig({
  base: isElectron ? './' : repoBase,
  plugins: [
    react(),
    ...(isElectron
      ? []
      : [
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
            manifest: {
              name: 'Wardogs Artillery Calculator',
              short_name: 'WD Artillery',
              description: "Azimut et distance pour le mortier dans Wardogs.",
              lang: 'fr',
              start_url: '.',
              scope: '.',
              display: 'standalone',
              orientation: 'portrait',
              background_color: '#0E0F11',
              theme_color: '#0E0F11',
              icons: [
                { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
                { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
                {
                  src: 'icon-maskable-512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'maskable',
                },
              ],
            },
            workbox: {
              globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
            },
          }),
        ]),
  ],
  server: { port: 5173, strictPort: true },
  build: { outDir: 'dist', emptyOutDir: true },
});
