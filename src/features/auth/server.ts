"use server";

import { HTTPError } from "ky";
import { removeTokens, setTokens } from "@/lib/session";
import { authApi, usersApi } from "./api";
import type { ILoginPayload, ISignupPayload } from "./types";

export const loginAction = async (payload: ILoginPayload) => {
  try {
    const res = await authApi.login(payload);

    if (res.success && res.payload?.access_token) {
      await setTokens(res.payload.access_token, res.payload.refresh_token);
    }
    return res;
  } catch (error: unknown) {
    if (error instanceof HTTPError) {
      return {
        success: false,
        message: "Đăng nhập thất bại. Hoặc thông tin không đúng.",
      };
    }
    const msg = error instanceof Error ? error.message : "Có lỗi xảy ra";
    return { success: false, message: msg };
  }
};

export const signupAction = async (payload: ISignupPayload) => {
  try {
    const res = await usersApi.signup(payload);
    return res;
  } catch (error: unknown) {
    if (error instanceof HTTPError) {
      return {
        success: false,
        message: "Đăng ký thất bại. Email hoặc SDT có thể đã tồn tại.",
      };
    }
    const msg = error instanceof Error ? error.message : "Có lỗi xảy ra";
    return { success: false, message: msg };
  }
};

export const logoutAction = async () => {
  await removeTokens();
};

export const getMeAction = async () => {
  try {
    const res = await usersApi.me();
    return res;
  } catch {
    return null;
  }
};
