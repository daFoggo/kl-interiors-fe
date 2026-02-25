import ky from "ky";
import { envConfig } from "@/configs/env";

/**
 * A ky instance for **public** (unauthenticated) endpoints.
 * Safe to use in both Server Components and Client Components — no localStorage access.
 */
export const publicApiClient = ky.create({
  prefixUrl: envConfig.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  retry: 1,
  headers: {
    "Content-Type": "application/json",
  },
});
