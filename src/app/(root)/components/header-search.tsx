import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";

export const HeaderSearch = ({ className }: { className?: string }) => {
  return (
    <InputGroup className={cn("bg-muted", className)}>
      <InputGroupInput placeholder="Tìm kiếm sản phẩm..." />
      <InputGroupAddon>
        <SearchIcon className="size-4" />
      </InputGroupAddon>
    </InputGroup>
  );
};
