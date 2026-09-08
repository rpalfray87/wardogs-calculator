import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Two build targets from one codebase:
//  - Electron loads files over file://  -> relative paths, no service worker
//  - GitHub Pages serves the site under a sub-path -> absolute base
const isElectron = process.env.BUILD_TARGET === 'electron';
const repoBase = process.env.PAGES_BASE ?? '/Wardogs-calculator/';

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
              name: 'Wardogs Calculator',
              short_name: 'Wardogs',
              description: 'Azimuth and range for mortar fire in Wardogs.',
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
