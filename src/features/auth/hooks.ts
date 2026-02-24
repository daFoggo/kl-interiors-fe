import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import type { IUser } from "@/types/user";
import { AUTH_ENDPOINTS, authApi, usersApi } from "./api";
import type { ILoginPayload, ISignupPayload } from "./types";

export const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR<IUser>(
    AUTH_ENDPOINTS.ME,
    () => usersApi.me(),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false, // Don't retry if hitting 401
    },
  );

  return {
    user: data,
    isLoading,
    isError: !!error,
    mutate,
  };
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
