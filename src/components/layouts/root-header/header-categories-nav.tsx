"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ICategory } from "@/features/categories";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface HeaderCategoriesNavProps {
  categories: ICategory[];
}

export const HeaderCategoriesNav = ({
  categories,
}: HeaderCategoriesNavProps) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "";

  const canScroll = useMediaQuery("(max-width: 1023px)");

  const isActive = (slug: string) => currentCategory === slug;

  return (
    <div className="w-full bg-primary">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-16">
        <div className="flex items-center overflow-hidden">
          <div className="flex-1 min-w-0 flex items-center overflow-x-auto overflow-y-hidden scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className={cn(
                  "whitespace-nowrap py-2 px-4 text-primary-foreground/70",
                  "text-sm font-medium transition-colors shrink-0",
                  !canScroll && [
                    "border-b-2 border-transparent",
                    "hover:border-primary-foreground",
                    isActive(cat.slug ?? "") && "border-primary-foreground",
                  ],
                  isActive(cat.slug ?? "")
                    ? "text-primary-foreground"
                    : "hover:text-primary-foreground",
                )}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Gradient fade + pinned "Xem tất cả" button */}
          <div className="shrink-0 flex items-stretch relative">
            <div
              aria-hidden
              className={cn(
                "absolute top-0 bottom-0 -left-12 w-12 pointer-events-none",
                "bg-linear-to-r from-transparent to-primary",
                "transition-opacity duration-300",
                canScroll ? "opacity-100" : "opacity-0",
              )}
            />
            <Link
              href="/products"
              className={cn(
                "flex items-center gap-1 text-sm py-2 px-4 whitespace-nowrap transition-colors",
                "text-primary-foreground/70 hover:text-primary-foreground",
              )}
            >
              <span>Xem tất cả</span>
              <ChevronRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
