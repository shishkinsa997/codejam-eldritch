import { defineConfig } from "vite";
import path from "path";
import { resolve } from "path";

export default defineConfig({
  base: "/codejam-eldritch/",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    outDir: "build",
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    terserOptions: {
      compress: false,
      mangle: false,
    },
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "index.html"),
      },
    },
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
    open: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 8080,
    open: true,
  },
});
