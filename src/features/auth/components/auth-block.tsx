"use client";

import Link from "next/link";
import { useState } from "react";
import { AppLogo } from "@/components/common/app-logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/features/auth/components/login-form";
import type { TAuthMethod } from "../types";
import { SignupForm } from "./signup-form";

export const AuthBlock = () => {
  const [authMethod, setAuthMethod] = useState<TAuthMethod>("email");
  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <div className="space-y-2 inline-block">
        <AppLogo />
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Đăng nhập</TabsTrigger>
          <TabsTrigger value="register">Đăng ký</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-6">
          <LoginForm method={authMethod} setMethod={setAuthMethod} />
        </TabsContent>

        <TabsContent value="register" className="mt-6">
          <SignupForm method={authMethod} setMethod={setAuthMethod} />
        </TabsContent>
      </Tabs>

      <p className="mt-auto text-center text-muted-foreground text-sm">
        Bằng việc tiếp tục, bạn đồng ý với{" "}
        <Link
          className="underline font-medium hover:text-primary"
          href="/terms-of-service"
        >
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link
          className="underline font-medium hover:text-primary"
          href="/privacy-policy"
        >
          Chính sách bảo mật
        </Link>{" "}
        của chúng tôi.
      </p>
    </div>
  );
};
