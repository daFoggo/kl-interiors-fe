"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { XIcon, MenuIcon } from "lucide-react";
import { rootNavigation } from "@/constants/root-navigation";
import Link from "next/link";
import { HeaderSearch } from "./header-search";
import { HeaderUser } from "./header-user";
import { HeaderUserBookmarks } from "./header-user-bookmarks";

export const RootHeaderMobile = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="lg:hidden flex items-center gap-2">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? (
          <XIcon className="size-4.5" />
        ) : (
          <MenuIcon className="size-4.5" />
        )}
      </Button>
      {open && (
        <Portal
          className="top-[60px] md:top-16 z-50 lg:hidden"
          id="mobile-menu"
        >
          <PortalBackdrop onClick={() => setOpen(false)} />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-95 ease-out data-[slot=open]:animate-in",
              "size-full p-4 bg-background flex flex-col gap-6",
            )}
            data-slot={open ? "open" : "closed"}
          >
            <HeaderSearch className="w-full" />
            <div className="grid gap-y-2">
              {rootNavigation.map((link) => (
                <Button
                  asChild
                  className="justify-start text-base"
                  key={link.title}
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  <Link href={link.href || "#"}>{link.title}</Link>
                </Button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <HeaderUserBookmarks className="w-full justify-start" showText />
              <HeaderUser className="w-full justify-start" />
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};
