import { getProductCollectionsServer } from "@/features/product-collections";
import { ProductCollectionsCarousel } from "./product-collections-carousel";

export const ProductCollectionsSection = async () => {
  const productCollections = await getProductCollectionsServer(10);

  if (!productCollections || productCollections.length === 0) {
    return null;
  }

  return <ProductCollectionsCarousel productCollections={productCollections} />;
};
