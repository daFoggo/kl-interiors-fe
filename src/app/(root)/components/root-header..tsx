"use client";
import Link from "next/link";
import { AppLogo } from "@/components/common/app-logo";
import { Button } from "@/components/ui/button";
import { rootNavigation } from "@/constants/root-navigation";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { HeaderSearch } from "./header-search";
import { HeaderUser } from "./header-user";
import { HeaderUserBookmarks } from "./header-user-bookmarks";
import { RootHeaderMobile } from "./root-header-mobile";

export const RootHeader = () => {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-transparent border-b transition-colors",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
            scrolled,
        },
      )}
    >
      <nav className="flex h-16 px-4 md:px-8 xl:px-16 w-full items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-4 justify-between">
          <AppLogo type="button" />
          <div className="hidden lg:flex items-center gap-2">
            {rootNavigation.map((item) => (
              <Link key={item.title} href={item.href || "#"}>
                <Button variant="link" className="text-base">
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-1 max-w-md mx-2 lg:mx-0">
          <HeaderSearch className="w-full" />
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <HeaderUserBookmarks />
          <HeaderUser showText />
        </div>

        <RootHeaderMobile />
      </nav>
    </header>
  );
};
