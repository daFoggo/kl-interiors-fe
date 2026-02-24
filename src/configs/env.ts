import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * @description Environment variables schema and validation
 */
export const envConfig = createEnv({
  server: {
    DATABASE_URL: z.url(),
    OPEN_AI_API_KEY: z.string().min(1),
    SELINE_TOKEN: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_BACKEND_URL: z.string().min(1),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
    SELINE_TOKEN: process.env.SELINE_TOKEN,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
});
