"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/features/auth/hooks";
import { cn } from "@/lib/utils";

export const HeaderUser = ({
  className,
  showText,
}: {
  className?: string;
  showText?: boolean;
}) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <Button variant="secondary" className={cn("gap-2", className)} disabled>
        <User className="size-4 animate-pulse" />
        {showText && (
          <span className="animate-pulse bg-muted rounded w-16 h-4"></span>
        )}
        {!showText && <span className="sr-only">Đang tải...</span>}
      </Button>
    );
  }

  if (user) {
    return (
      <Button variant="secondary" className={cn("gap-2", className)}>
        <User className="size-4" />
        {showText && <span>{user.full_name}</span>}
        {!showText && <span className="sr-only">{user.full_name}</span>}
      </Button>
    );
  }

  return (
    <Button variant="secondary" className={cn("gap-2", className)}>
      <User className="size-4" />
      {showText && <span>Đăng nhập</span>}
      {!showText && <span className="sr-only">Đăng nhập</span>}
    </Button>
  );
};
