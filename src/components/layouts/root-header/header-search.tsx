import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

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
