import ky from "ky";
import { envConfig } from "@/configs/env";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setTokens,
} from "./session";

/**
 * Server-only authenticated ky instance.
 * Automatically injects the `accessToken` from `httpOnly` cookies via `next/headers`.
 * Supports automatic token refreshing if hitting a 401.
 */
export const authedApiClient = ky.create({
  prefixUrl: envConfig.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  retry: 1,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await getAccessToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (!response.ok) {
          if (
            response.status === 401 &&
            !request.url.includes("auth/refresh") &&
            !request.url.includes("auth/login")
          ) {
            const refreshToken = await getRefreshToken();
            if (refreshToken) {
              try {
                const refreshRes = await ky
                  .post(`${envConfig.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
                    json: { refresh_token: refreshToken },
                  })
                  .json<{
                    success: boolean;
                    payload: { access_token: string; refresh_token: string };
                  }>();

                if (refreshRes?.payload?.access_token) {
                  await setTokens(
                    refreshRes.payload.access_token,
                    refreshRes.payload.refresh_token,
                  );

                  // Re-try the original request
                  request.headers.set(
                    "Authorization",
                    `Bearer ${refreshRes.payload.access_token}`,
                  );
                  return ky(request);
                }
              } catch {
                await removeTokens();
              }
            } else {
              await removeTokens();
            }
          }
        }
        return response;
      },
    ],
  },
});
