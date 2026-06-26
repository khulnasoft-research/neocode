import wasm from "vite-plugin-wasm"
import { defineConfig, PluginOption } from "vite"
import { solidStart } from "@solidjs/start/config"
import { nitro } from "nitro/vite"

const wasmPlugins = [wasm()]

export default defineConfig({
  plugins: [
    ...wasmPlugins,
    solidStart({
      middleware: "./src/middleware.ts",
    }) as PluginOption,
    nitro({
      compatibilityDate: "2024-09-19",
      preset: "cloudflare_module",
      cloudflare: {
        nodeCompat: true,
      },
      rollupConfig: {
        external: ["shiki"],
      },
    }),
  ],
  ssr: {
    external: ["shiki"],
  },
  server: {
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      external: ["cloudflare:workers"],
    },
    minify: false,
  },
})
