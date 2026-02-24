import Link from "next/link";
import { SITE_CONFIG } from "@/configs/site";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type TAppLogoType = "text" | "image" | "button";

interface IAppLogoProps {
  type?: TAppLogoType;
  className?: string;
}
export const AppLogo = ({ type = "text", className }: IAppLogoProps) => {
  if (type === "text") {
    return (
      <span className="uppercase text-xl md:text-2xl font-bold">
        {SITE_CONFIG.metadata.title}
      </span>
    );
  } else if (type === "button") {
    return (
      <Link href="/">
        <Button
          className={cn(
            "text-xl md:text-2xl font-bold px-2 md:px-4",
            className,
          )}
          variant="ghost"
        >
          <span className="uppercase">{SITE_CONFIG.metadata.logoTitle}</span>
        </Button>
      </Link>
    );
  }
};
