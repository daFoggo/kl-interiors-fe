import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";

export const HeaderUserBookmarks = ({
  className,
  showText,
}: {
  className?: string;
  showText?: boolean;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size={showText ? "default" : "icon"}
          className={cn("gap-2", className)}
          asChild
        >
          <Link href="/bookmarks">
            <Heart className={cn({ "size-4": showText })} />
            {showText && <span>Sản phẩm đã đánh dấu</span>}
          </Link>
        </Button>
      </TooltipTrigger>
      {!showText && (
        <TooltipContent>
          <p>Sản phẩm đã đánh dấu</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};
