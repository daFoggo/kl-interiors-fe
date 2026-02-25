"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout, useUser } from "@/features/auth";
import { cn } from "@/lib/utils";

interface IHeaderUserProps {
  className?: string;
  showText?: boolean;
}

export const HeaderUser = ({ className, showText }: IHeaderUserProps) => {
  const { user, isLoading } = useUser();
  const { logout } = useLogout();

  if (isLoading) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Skeleton className="size-9 rounded-md" />
        {showText && <Skeleton className="h-4 w-20 rounded-md" />}
      </div>
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
              onClick={logout}
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
