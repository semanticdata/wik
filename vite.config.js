import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/wik/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        page: resolve(__dirname, "page.html"),
        test: resolve(__dirname, "test.html"),
      },
    },
  },
});
