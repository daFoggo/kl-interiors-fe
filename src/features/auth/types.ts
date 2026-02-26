export interface IUser {
  email: string;
  full_name: string;
  phone_number: string;
  avatar_url: string;
  id: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ITokenInfo {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export type TAuthMethod = "email" | "phone";

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message?: string;
  payload?: ITokenInfo;
}

export interface ISignupPayload {
  email: string;
  full_name: string;
  phone_number: string;
  avatar_url?: string;
  password: string;
}

export interface ISignupResponse {
  success: boolean;
  message?: string;
  payload?: IUser;
}

export interface IRefreshTokenPayload {
  refresh_token: string;
}

export interface IRefreshTokenResponse {
  success: boolean;
  payload: ITokenInfo;
}

export interface IMeResponse {
  success: boolean;
  message?: string;
  payload?: IUser;
}
