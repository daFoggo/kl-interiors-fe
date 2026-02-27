import { RootHeader } from "@/components/layouts/root-header";
import { HeroImage } from "./components/hero-image";
import { ProductCollectionsSection } from "./components/product-collections-section";

const RootPage = async () => {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <RootHeader />
      <main className="flex-1 relative">
        <HeroImage />
        <ProductCollectionsSection />
      </main>
    </div>
  );
};

export default RootPage;
