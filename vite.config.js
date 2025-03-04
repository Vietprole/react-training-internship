import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      exclude: [
        "**/*.stories.{js,jsx}",
        "**/*.mock.{js,jsx}",
        "**/*.config.js",
        "src/main.jsx",
        ".storybook/**",
        "src/setup-tests.js",
      ],
    },
  },
});
