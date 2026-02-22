"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export const HeaderUser = ({ className }: { className?: string }) => {
  return (
    <Button variant="secondary" className={cn("gap-2", className)}>
      <User className="size-4" />
      Đăng nhập hoặc đăng ký{" "}
    </Button>
  );
};
