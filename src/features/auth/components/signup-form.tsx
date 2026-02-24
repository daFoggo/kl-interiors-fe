"use client";

import { useForm } from "@tanstack/react-form";
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
import { useSignupMutation } from "../hooks";
import type { TAuthMethod } from "../types";

interface ISignupFormProps {
  method: TAuthMethod;
  setMethod: (method: TAuthMethod) => void;
}
export const SignupForm = ({ method, setMethod }: ISignupFormProps) => {
  const getSignupSchema = (method: TAuthMethod) =>
    z
      .object({
        email:
          method === "email"
            ? z.email("Vui lòng nhập địa chỉ email hợp lệ.")
            : z.string(),
        phone_number:
          method === "phone"
            ? z.string().min(10, "Số điện thoại không hợp lệ.")
            : z.string(),
        full_name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự."),
        password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
        confirm_password: z.string().min(6, "Vui lòng xác nhận mật khẩu."),
      })
      .refine((data) => data.password === data.confirm_password, {
        message: "Mật khẩu xác nhận không khớp.",
        path: ["confirm_password"],
      });

  const { signup } = useSignupMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      phone_number: "",
      full_name: "",
      password: "",
      confirm_password: "",
    },
    validators: {
      onChange: getSignupSchema(method),
    },
    onSubmit: async ({ value }) => {
      try {
        await signup({
          email: value.email,
          phone_number: value.phone_number,
          full_name: value.full_name,
          password: value.password,
        });
        toast.success("Đăng ký thành công!");
      } catch (error) {
        toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại.");
        console.error("Signup error:", error);
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
                      Sử dụng Email
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

        <form.Field name="full_name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Họ và tên</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Nguyễn Văn A"
                  autoComplete="name"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

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
                  placeholder="Nhập mật khẩu"
                  autoComplete="new-password"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="confirm_password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Xác nhận mật khẩu</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="new-password"
                  placeholder="Nhập lại mật khẩu"
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
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
