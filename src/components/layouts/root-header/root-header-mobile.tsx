"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { rootNavigation } from "@/constants/root-navigation";
import { cn } from "@/lib/utils";

export const RootHeaderMobile = ({
  headerUser,
  headerUserBookmarks,
}: {
  headerUser: ReactNode;
  headerUserBookmarks: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden flex items-center gap-2">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
        className="size-8"
      >
        {open ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
      </Button>

      {open && (
        <Portal className="sm:top-40 top-36 xl:hidden" id="mobile-menu">
          <PortalBackdrop onClick={() => setOpen(false)} />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "w-full p-4",
            )}
            data-slot={open ? "open" : "closed"}
          >
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

            <div className="mt-4 flex flex-col gap-2">
              {headerUserBookmarks}
              {headerUser}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};
