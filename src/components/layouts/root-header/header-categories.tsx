import { Skeleton } from "@/components/ui/skeleton";
import { getPopularProductCategories } from "@/features/product-categories";
import { HeaderCategoriesNav } from "./header-categories-nav";

const TAB_LIMIT = 8;

export const HeaderCategories = async () => {
  const res = await getPopularProductCategories(TAB_LIMIT);
  const categories = res.success ? res.payload : [];

  return <HeaderCategoriesNav categories={categories} />;
};

export const HeaderCategoriesSkeleton = () => (
  <div className="w-full bg-primary">
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-16">
      <div className="flex items-center gap-1 py-2">
        {["w-20", "w-24", "w-16", "w-28", "w-20"].map((w) => (
          <Skeleton
            key={w}
            className={`h-5 ${w} rounded bg-primary-foreground/20 shrink-0`}
          />
        ))}
      </div>
    </div>
  </div>
);
