import { authedApiClient } from "@/lib/authed-ky";
import { publicApiClient } from "@/lib/public-ky";
import type {
  ILoginPayload,
  ILoginResponse,
  IMeResponse,
  ISignupPayload,
  ISignupResponse,
} from "./types";

export const AUTH_ENDPOINTS = {
  LOGIN: "auth/login",
  REFRESH: "auth/refresh",
} as const;

export const USERS_ENDPOINTS = {
  REGISTER: "users/register",
  ME: "users/me",
} as const;

export const authApi = {
  login: async (payload: ILoginPayload): Promise<ILoginResponse> => {
    return await publicApiClient
      .post(AUTH_ENDPOINTS.LOGIN, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(payload as unknown as Record<string, string>),
      })
      .then((res) => res.json());
  },

  // Refresh token is handled implicitly inside authed-ky interceptors,
  // but if needed to call manually:
  refresh: async (
    refreshToken: string,
  ): Promise<{
    success: boolean;
    payload: { access_token: string; refresh_token: string };
  }> => {
    return await publicApiClient
      .post(AUTH_ENDPOINTS.REFRESH, { json: { refresh_token: refreshToken } })
      .then((res) => res.json());
  },
};

export const usersApi = {
  signup: async (payload: ISignupPayload): Promise<ISignupResponse> => {
    return await publicApiClient
      .post(USERS_ENDPOINTS.REGISTER, { json: payload })
      .then((res) => res.json());
  },

  me: async (): Promise<IMeResponse> => {
    return await authedApiClient.get(USERS_ENDPOINTS.ME).json<IMeResponse>();
  },
};
