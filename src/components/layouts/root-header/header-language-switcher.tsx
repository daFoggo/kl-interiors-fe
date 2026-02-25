"use client";

import { ChevronDownIcon, GlobeIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const languages = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
];

export const HeaderLanguageSwitcher = ({
  className,
}: {
  className?: string;
}) => {
  const [current, setCurrent] = useState("vi");

  const currentLang = languages.find((l) => l.code === current) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 text-sm font-medium text-muted-foreground hover:text-foreground h-8 px-2",
            className,
          )}
        >
          <GlobeIcon />
          <span>{currentLang?.label}</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {languages.map((lang) => (
          <DropdownMenuCheckboxItem
            key={lang.code}
            className="cursor-pointer"
            checked={current === lang.code}
            onCheckedChange={() => setCurrent(lang.code)}
          >
            {lang.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
