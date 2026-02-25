import { useRouter } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { removeTokens } from "@/lib/ky";
import { AUTH_ENDPOINTS, authApi, usersApi } from "./api";
import type { ILoginPayload, IMeResponse, ISignupPayload } from "./types";

export const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR<IMeResponse>(
    AUTH_ENDPOINTS.ME,
    () => usersApi.me(),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false, // Don't retry if hitting 401
    },
  );

  return {
    user: data?.payload,
    isLoading,
    isError: !!error || !data?.success,
    mutate,
    isAuthenticated: !!data?.payload && !error && data.success,
  };
};

export const useLogout = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const logout = () => {
    removeTokens();
    mutate(AUTH_ENDPOINTS.ME, undefined, { revalidate: false });
    router.push("/auth");
  };

  return { logout };
};

export const useLoginMutation = () => {
  const { trigger, isMutating, error, data } = useSWRMutation(
    AUTH_ENDPOINTS.LOGIN,
    async (_, { arg }: { arg: ILoginPayload }) => {
      return await authApi.login(arg);
    },
  );

  return {
    login: trigger,
    isMutating,
    error,
    data,
  };
};

export const useSignupMutation = () => {
  const { trigger, isMutating, error, data } = useSWRMutation(
    AUTH_ENDPOINTS.REGISTER,
    async (_, { arg }: { arg: ISignupPayload }) => {
      return await usersApi.signup(arg);
    },
  );

  return {
    signup: trigger,
    isMutating,
    error,
    data,
  };
};
