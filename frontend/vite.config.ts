import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'VITE_', // Ensure this line is present
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts", // Ensure this is correct
      registerType: "autoUpdate",
      injectManifest: {
        swDest: "dist/sw.js",
      },
      manifest: {
        name: "Goalz",
        short_name: "Goalz",
        icons: [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        theme_color: "#1a1a1a",
        background_color: "#1a1a1a",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
      },
      // Remove rollupOptions here as it's not a valid VitePWA option
    }),
  ],
  // Add build configuration at root level if needed
  build: {
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
});
