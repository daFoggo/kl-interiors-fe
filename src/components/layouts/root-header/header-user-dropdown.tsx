"use client";

import { LogOut, User } from "lucide-react";
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
import { logoutAction } from "@/features/auth/server";
import type { IUser } from "@/features/auth/types";
import { cn } from "@/lib/utils";

interface IHeaderUserDropdownProps {
  user: IUser;
  className?: string;
  showText?: boolean;
}

export const HeaderUserDropdown = ({
  user,
  className,
  showText,
}: IHeaderUserDropdownProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/auth");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className={cn("gap-2", className)}>
          <User className="size-4" />
          {showText && (
            <span>{user.full_name || user.email || user.phone_number}</span>
          )}
          {!showText && (
            <span className="sr-only">
              {user.full_name || user.email || user.phone_number}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>{user.email || user.phone_number}</span>
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
};
