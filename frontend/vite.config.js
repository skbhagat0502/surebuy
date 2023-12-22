import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://surebuy-api.vercel.app/",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  plugins: [react()],
});
