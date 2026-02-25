import ky, { type Options } from "ky";
import { envConfig } from "@/configs/env";

// Types
export interface IApiClientOptions extends Omit<Options, "prefixUrl"> {
  prefixUrl?: string; // Optional because sometime we want to use full url
  isAuth?: boolean; // If true, attach Authorization header
}

// Default configuration
const DEFAULT_OPTIONS: Options = {
  timeout: 10000, // 10s default
  retry: 2,
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshToken");
  }
  return null;
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const removeTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export const checkIsAuthenticated = () => {
  return !!getAccessToken();
};

/**
 * Creates a configured ky instance for a specific API service
 *
 * @param baseUrl - The base URL for this service (e.g., 'https://api.example.com/v1') or 'api/v1'
 * @param options - Additional ky options and custom flags
 */
export const createApiClient = (
  baseUrl?: string,
  options: IApiClientOptions = {},
) => {
  const { isAuth = true, ...kyOptions } = options;

  return ky.create({
    ...(baseUrl ? { prefixUrl: baseUrl } : {}),
    ...DEFAULT_OPTIONS,
    ...kyOptions,
    hooks: {
      beforeRequest: [
        async (request) => {
          // 1. Automatically attach Authorization header if 'isAuth' is true (default)
          if (isAuth) {
            const token = getAccessToken();
            if (token) {
              request.headers.set("Authorization", `Bearer ${token}`);
            }
          }
        },
        // Allow passing additional beforeRequest hooks via options
        ...(kyOptions.hooks?.beforeRequest ?? []),
      ],
      afterResponse: [
        async (request, _options, response) => {
          // 2. Global error handling
          if (!response.ok) {
            // Check for 401 Unauthorized
            if (
              response.status === 401 &&
              !request.url.includes("auth/refresh") &&
              !request.url.includes("auth/login")
            ) {
              const refreshToken = getRefreshToken();
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
                    setTokens(
                      refreshRes.payload.access_token,
                      refreshRes.payload.refresh_token,
                    );
                    request.headers.set(
                      "Authorization",
                      `Bearer ${refreshRes.payload.access_token}`,
                    );
                    return ky(request);
                  }
                } catch (_error) {
                  // Token refresh failed — clear tokens
                  // Auth redirect should be handled at the specific route/component level
                  removeTokens();
                }
              } else {
                // No refresh token available — clear tokens
                // Auth redirect should be handled at the specific route/component level
                removeTokens();
              }
            }
          }
          return response;
        },
        // Allow passing additional afterResponse hooks via options
        ...(kyOptions.hooks?.afterResponse ?? []),
      ],
    },
  });
};

export const apiClient = createApiClient(envConfig.NEXT_PUBLIC_BACKEND_URL);
