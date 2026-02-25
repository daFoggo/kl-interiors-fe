"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const productCategories = [
  { label: "Tất cả", href: "/products", value: "" },
  {
    label: "Phòng khách",
    href: "/products?category=living-room",
    value: "living-room",
  },
  { label: "Phòng ngủ", href: "/products?category=bedroom", value: "bedroom" },
  {
    label: "Phòng ăn",
    href: "/products?category=dining-room",
    value: "dining-room",
  },
  {
    label: "Phòng làm việc",
    href: "/products?category=office",
    value: "office",
  },
  { label: "Nhà bếp", href: "/products?category=kitchen", value: "kitchen" },
  {
    label: "Phòng tắm",
    href: "/products?category=bathroom",
    value: "bathroom",
  },
  { label: "Ngoài trời", href: "/products?category=outdoor", value: "outdoor" },
];

export const HeaderCategoryTabs = () => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "";

  const canScroll = useMediaQuery("(max-width: 1023px)");

  const isActive = (value: string) => currentCategory === value;

  return (
    <div className="w-full bg-primary">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-16">
        <div className="flex items-center overflow-hidden">
          <div className="flex-1 min-w-0 flex items-center overflow-x-auto overflow-y-hidden scrollbar-hide">
            {productCategories.slice(1).map((cat) => (
              <Link
                key={cat.value}
                href={cat.href}
                className={cn(
                  "whitespace-nowrap py-2 px-4 text-primary-foreground/70",
                  "text-sm font-medium transition-colors shrink-0",
                  // Only show underline indicator when NOT in scroll mode
                  !canScroll && [
                    "border-b-2 border-transparent",
                    "hover:border-primary-foreground",
                    isActive(cat.value) && "border-primary-foreground",
                  ],
                  // Always apply text active state regardless
                  isActive(cat.value)
                    ? "text-primary-foreground"
                    : "hover:text-primary-foreground",
                )}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Gradient fade + pinned "Xem tất cả" button */}
          <div className="shrink-0 flex items-stretch relative">
            {/* The gradient overlay — fades from transparent-primary to primary,
                positioned to the left of this container so it bleeds over the tab list */}
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
