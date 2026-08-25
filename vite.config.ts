import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const projectRoot = import.meta.dirname;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "client", "src"),
    },
  },
  root: path.resolve(projectRoot, "client"),
  build: {
    outDir: path.resolve(projectRoot, "dist"),
    emptyOutDir: true,
  },
});
