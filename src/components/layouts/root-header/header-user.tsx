import { User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMeAction } from "@/features/auth/server";
import { cn } from "@/lib/utils";
import { HeaderUserDropdown } from "./header-user-dropdown";

interface IHeaderUserProps {
  className?: string;
  showText?: boolean;
}

export const HeaderUser = async ({ className, showText }: IHeaderUserProps) => {
  const res = await getMeAction();
  const user = res?.payload;

  if (user) {
    return (
      <HeaderUserDropdown
        user={user}
        className={className}
        showText={showText}
      />
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
