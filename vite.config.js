import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "favicon-16x16.png",
        "favicon-32x32.png",
      ],

      manifest: {
        name: "Vaibhav Singh",

        short_name: "Vaibhav",

        description:
          "Portfolio of Vaibhav Singh - Full Stack MERN Developer",

        theme_color: "#2563EB",

        background_color: "#09090B",

        display: "standalone",

        start_url: "/",

        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),

    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  build: {
    sourcemap: false,

    cssCodeSplit: true,

    chunkSizeWarningLimit: 1000,
  },
});