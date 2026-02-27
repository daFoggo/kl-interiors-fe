import { Skeleton } from "@/components/ui/skeleton";
import { getProductCollectionsServer } from "@/features/product-collections";
import { ProductCollectionsCarousel } from "./product-collections-carousel";

export const ProductCollectionsSkeleton = () => {
	return (
		<div className="w-full bg-background py-4 md:py-8 xl:py-16 flex flex-col overflow-hidden">
			<div className="px-4 md:px-8 xl:px-16 mb-4 md:mb-6 xl:mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
				<div>
					<Skeleton className="h-10 w-[280px] md:w-[400px] mb-4" />
					<Skeleton className="h-6 w-[350px] md:w-[500px]" />
				</div>
				<Skeleton className="h-10 w-[180px] hidden md:block" />
			</div>

			<div className="flex gap-4 md:gap-6 lg:gap-8 pl-4 md:pl-8 lg:pl-16">
				<Skeleton className="h-[60vh] md:h-[65vh] xl:h-[70vh] w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] xl:w-[30vw] rounded-2xl shrink-0" />
				<Skeleton className="h-[60vh] md:h-[65vh] xl:h-[70vh] w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] xl:w-[30vw] rounded-2xl shrink-0" />
				<Skeleton className="h-[60vh] md:h-[65vh] xl:h-[70vh] w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] xl:w-[30vw] rounded-2xl shrink-0 hidden sm:block" />
			</div>
		</div>
	);
};

export const ProductCollectionsSection = async () => {
	const productCollections = await getProductCollectionsServer(10);

	if (!productCollections || productCollections.length === 0) {
		return null;
	}

	return <ProductCollectionsCarousel productCollections={productCollections} />;
};
