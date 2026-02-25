import Link from "next/link";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { HeaderCategoryTabs } from "./header-category-tabs";
import { HeaderLanguageSwitcher } from "./header-language-switcher";
import { HeaderNav } from "./header-nav";
import { HeaderSearch } from "./header-search";
import { HeaderUser } from "./header-user";
import { HeaderUserBookmarks } from "./header-user-bookmarks";
import { RootHeaderMobile } from "./root-header-mobile";

const HeaderUserSkeleton = () => <Skeleton className="h-9 w-28 rounded-md" />;

const HeaderBookmarkSkeleton = () => <Skeleton className="size-9 rounded-md" />;

export const RootHeader = () => {
  return (
    <header className="w-full z-50">
      {/*  Group 1: non-sticky  */}
      <div className="w-full bg-background border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-16">
          {/* Row 1: Search | Logo (absolutely centered) | Nav + Actions */}
          <div className="relative z-50 flex items-center h-14 md:h-16">
            {/* Left – Search (desktop) */}
            <div className="hidden xl:flex flex-1 max-w-xs lg:max-w-sm">
              <HeaderSearch className="w-full" />
            </div>

            {/* Center – Logo: always exactly in the middle */}
            <div className="absolute inset-x-0 flex justify-center pointer-events-none">
              <Link href="/" className="pointer-events-auto">
                <span className="uppercase font-bold tracking-tight text-2xl md:text-3xl text-foreground">
                  klinh.
                </span>
              </Link>
            </div>

            {/* Right – Nav links + Bookmarks + User + Language + Mobile burger */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Nav links (desktop only) — client component for active state */}
              <HeaderNav />

              {/* Divider (desktop only) */}
              <Separator
                orientation="vertical"
                className="my-2 hidden xl:block"
              />

              {/* Bookmarks + User + Language (desktop only) */}
              <div className="hidden xl:flex items-center gap-2">
                <Suspense fallback={<HeaderBookmarkSkeleton />}>
                  <HeaderUserBookmarks />
                </Suspense>
                <Suspense fallback={<HeaderUserSkeleton />}>
                  <HeaderUser showText />
                </Suspense>
                <HeaderLanguageSwitcher />
              </div>

              {/* Mobile burger */}
              <RootHeaderMobile />
            </div>
          </div>

          {/* Mobile search row */}
          <div className="xl:hidden pb-4">
            <HeaderSearch className="w-full" />
          </div>
        </div>
      </div>

      {/*  Group 2: sticky Category Tab Bar */}
      <div className="sticky top-0 z-30 shadow-sm">
        <Suspense fallback={<div className="h-10 w-full bg-primary" />}>
          <HeaderCategoryTabs />
        </Suspense>
      </div>
    </header>
  );
};
