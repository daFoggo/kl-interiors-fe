"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout, useUser } from "@/features/auth";
import { cn } from "@/lib/utils";

export const HeaderUser = ({
  className,
  showText,
}: {
  className?: string;
  showText?: boolean;
}) => {
  const { user, isLoading } = useUser();
  const { logout } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className={cn("gap-2", className)}>
            <User className="size-4" />
            {showText && (
              <span>
                {user?.full_name || user?.email || user?.phone_number}
              </span>
            )}
            {!showText && (
              <span className="sr-only">
                {user?.full_name || user?.email || user?.phone_number}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>{user?.email || user?.phone_number}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="justify-between cursor-pointer"
              onClick={handleLogout}
            >
              <span>Đăng xuất</span>
              <LogOut className="size-4" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link href="/auth">
      <Button variant="secondary" className={cn("gap-2", className)}>
        <User className="size-4" />
        {showText && <span>Đăng nhập</span>}
        {!showText && <span className="sr-only">Đăng nhập</span>}
      </Button>
    </Link>
  );
};
