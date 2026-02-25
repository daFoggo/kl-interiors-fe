import { apiClient } from "@/lib/ky";
import type {
  ILoginPayload,
  ILoginResponse,
  IMeResponse,
  IRefreshTokenPayload,
  IRefreshTokenResponse,
  ISignupPayload,
  ISignupResponse,
  IUser,
} from "./types";

export const AUTH_ENDPOINTS = {
  LOGIN: "auth/login",
  REFRESH: "auth/refresh",
  REGISTER: "users/register",
  ME: "users/me",
} as const;

export const authApi = {
  login: async (payload: ILoginPayload): Promise<ILoginResponse> => {
    return await apiClient
      .post(AUTH_ENDPOINTS.LOGIN, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(payload as unknown as Record<string, string>),
      })
      .then((res) => res.json());
  },

  refresh: async (
    payload: IRefreshTokenPayload,
  ): Promise<IRefreshTokenResponse> => {
    return await apiClient
      .post(AUTH_ENDPOINTS.REFRESH, { json: payload })
      .then((res) => res.json());
  },
};

export const usersApi = {
  signup: async (payload: ISignupPayload): Promise<ISignupResponse> => {
    return await apiClient
      .post(AUTH_ENDPOINTS.REGISTER, { json: payload })
      .then((res) => res.json());
  },

  me: async (): Promise<IMeResponse> => {
    const res = await apiClient.get(AUTH_ENDPOINTS.ME).json<IMeResponse>();
    return res;
  },
};
