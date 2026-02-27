import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HeaderCategories,
  HeaderCategoriesSkeleton,
} from "./header-categories";
import { HeaderLanguageSwitcher } from "./header-language-switcher";
import { HeaderSearch } from "./header-search";
import { HeaderUser } from "./header-user";
import { HeaderUserBookmarks } from "./header-user-bookmarks";
import { RootHeaderMobile } from "./root-header-mobile";

const HeaderUserSkeleton = () => <Skeleton className="h-9 w-28 rounded-md" />;

const HeaderBookmarkSkeleton = () => <Skeleton className="size-9 rounded-md" />;

export const RootHeader = () => {
  return (
    <>
      {/*  Group 1: non-sticky  */}
      <header className="w-full z-50 bg-background border-b border-border">
        <div className=" mx-auto px-4 md:px-8 xl:px-16">
          {/* Row 1: Search | Logo (absolutely centered) | Nav + Actions */}
          <div className="relative z-50 flex items-center h-14 md:h-16">
            {/* Left – Search (desktop) */}
            <div className="hidden lg:flex flex-1 max-w-xs lg:max-w-sm">
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
              <RootHeaderMobile
                headerUser={
                  <Suspense fallback={<HeaderUserSkeleton />}>
                    <HeaderUser className="w-full justify-start" showText />
                  </Suspense>
                }
                headerUserBookmarks={
                  <Suspense fallback={<HeaderBookmarkSkeleton />}>
                    <HeaderUserBookmarks
                      className="w-full justify-start"
                      showText
                    />
                  </Suspense>
                }
              />
            </div>
          </div>

          {/* Mobile search row */}
          <div className="lg:hidden pb-4">
            <HeaderSearch className="w-full" />
          </div>
        </div>
      </header>

      {/*  Group 2: sticky Category Tab Bar */}
      <div className="sticky top-0 z-30 shadow-sm">
        <Suspense fallback={<HeaderCategoriesSkeleton />}>
          <HeaderCategories />
        </Suspense>
      </div>
    </>
  );
};
