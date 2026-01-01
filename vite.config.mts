import * as path from "node:path";
import { fileURLToPath } from "node:url";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    coverage: {
      exclude: ["**/node_modules/**", "**/index.ts, ", "vite.config.mts"],
    },
    globals: true,
    restoreMocks: true,
    environment: "node",
  },
  server: {
    https: {
      key: path.resolve(
        __dirname,
        "./common/certificate/STAR.leadangel.com_key.key"
      ),
      cert: path.resolve(
        __dirname,
        "./common/certificate/STAR_leadangel_com.crt"
      ),
    },
  },
  plugins: [tsconfigPaths()],
});
