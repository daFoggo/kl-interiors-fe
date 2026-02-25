"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "../hooks";
import type { TAuthMethod } from "../types";

interface ILoginFormProps {
  method: TAuthMethod;
  setMethod: (method: TAuthMethod) => void;
}

export const LoginForm = ({ method, setMethod }: ILoginFormProps) => {
  const router = useRouter();
  const getLoginSchema = (method: TAuthMethod) =>
    z.object({
      email:
        method === "email"
          ? z.email("Vui lòng nhập địa chỉ email hợp lệ.")
          : z.string(),
      phone_number:
        method === "phone"
          ? z.string().min(10, "Số điện thoại không hợp lệ.")
          : z.string(),
      password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
    });
  const { login } = useLoginMutation();
  const form = useForm({
    defaultValues: {
      email: "",
      phone_number: "",
      password: "",
    },
    validators: {
      onChange: getLoginSchema(method),
    },
    onSubmit: async ({ value }) => {
      try {
        const username = method === "email" ? value.email : value.phone_number;
        const res = await login({
          username,
          password: value.password,
        });

        if (res?.payload?.access_token) {
          localStorage.setItem("accessToken", res.payload.access_token);
          if (res.payload.refresh_token) {
            localStorage.setItem("refreshToken", res.payload.refresh_token);
          }
        }

        toast.success("Đăng nhập thành công!");
        router.push("/");
      } catch (error) {
        toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại.");
        console.error("Login error:", error);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        {method === "email" ? (
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <button
                      type="button"
                      className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors hover:underline"
                      onClick={() => {
                        setMethod("phone");
                        form.setFieldValue("email", "");
                      }}
                    >
                      Sử dụng số điện thoại
                    </button>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="nguyenvana@example.com"
                    autoComplete="email"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        ) : (
          <form.Field name="phone_number">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>Số điện thoại</FieldLabel>
                    <button
                      type="button"
                      className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors hover:underline"
                      onClick={() => {
                        setMethod("email");
                        form.setFieldValue("phone_number", "");
                      }}
                    >
                      Dùng Email
                    </button>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="0123456789"
                    autoComplete="tel"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        )}

        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Mật khẩu</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button className="w-full" type="submit" disabled={!canSubmit}>
            {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
