"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { rootNavigation } from "@/constants/root-navigation";
import { cn } from "@/lib/utils";

export const HeaderNav = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden xl:flex items-center">
      {rootNavigation.map((item) => (
        <Link key={item.title} href={item.href || "#"}>
          <Button
            variant="ghost"
            className={cn(
              "text-sm font-medium text-muted-foreground hover:text-foreground",
              pathname === item.href && "text-foreground bg-muted",
            )}
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
};
