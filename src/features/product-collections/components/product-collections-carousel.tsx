/** biome-ignore-all lint/performance/noImgElement: <img> */
"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { IProductCollection } from "../types";

interface ProductCollectionsCarouselProps {
  productCollections: IProductCollection[];
}

export const ProductCollectionsCarousel = ({
  productCollections,
}: ProductCollectionsCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const progress = useMotionValue(0);
  const objectPositionPercentage = useTransform(progress, [0, 1], [100, 0]);
  const objectPosition = useTransform(
    objectPositionPercentage,
    (val: number) => `${val}% center`,
  );

  useEffect(() => {
    if (!api) return;

    const updateAll = () => {
      progress.set(Math.max(0, Math.min(1, api.scrollProgress())));
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("scroll", updateAll);
    api.on("select", updateAll);
    api.on("settle", updateAll);
    api.on("reInit", updateAll);

    updateAll();

    return () => {
      api.off("scroll", updateAll);
      api.off("select", updateAll);
      api.off("settle", updateAll);
      api.off("reInit", updateAll);
    };
  }, [api, progress]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !api) return;

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX < 5 && absY < 5) return;
      if (absX <= absY) return;
      e.preventDefault();
      if (e.deltaX > 0) api.scrollNext();
      else api.scrollPrev();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [api]);

  if (!productCollections.length) return null;

  const handlePrev = () => api?.scrollPrev();
  const handleNext = () => api?.scrollNext();

  return (
    <div
      className={cn(
        "w-full overflow-hidden bg-background py-4 md:py-8 xl:py-16 flex flex-col",
      )}
    >
      {/* Header */}
      <div className="px-4 md:px-8 xl:px-16 mb-4 md:mb-6 xl:mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl text-primary tracking-tight font-medium mb-4">
            Khám phá các{" "}
            <span className="font-bold text-primary/90">Bộ sưu tập</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            Các bộ sưu tập được thiết kế và gia công tỉ mỉ, mang đến cho bạn
            những sản phẩm chất lượng và độc đáo.
          </p>
        </div>

        <Link href="/products">
          <Button variant="link" size="lg" className="gap-2">
            <span className="text-lg">Xem tất cả bộ sưu tập</span>
            <ArrowRight className="size-5" />
          </Button>
        </Link>
      </div>

      {/* Carousel with side nav buttons */}
      <div ref={viewportRef} className="relative">
        <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 pb-12 pointer-events-none">
          <Button
            variant="outline"
            onClick={handlePrev}
            aria-label="Previous"
            aria-disabled={!canScrollPrev}
            disabled={!canScrollPrev}
            className={cn(
              "rounded-full shadow-md size-12 pointer-events-auto transition-opacity duration-200",
              !canScrollPrev && "opacity-40 cursor-default",
            )}
          >
            <ChevronLeft />
          </Button>
        </div>

        <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 pb-12 pointer-events-none">
          <Button
            variant="outline"
            onClick={handleNext}
            aria-label="Next"
            aria-disabled={!canScrollNext}
            disabled={!canScrollNext}
            className={cn(
              "rounded-full shadow-md size-12 pointer-events-auto transition-opacity duration-200",
              !canScrollNext && "opacity-40 cursor-default",
            )}
          >
            <ChevronRight />
          </Button>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            containScroll: "trimSnaps",
            dragFree: true,
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="pb-12 ml-0">
            {/* Plain div — không có class embla__slide nên Embla bỏ qua, chỉ tạo visual offset */}
            <div className="shrink-0 w-4 md:w-6 lg:w-8" aria-hidden="true" />
            {productCollections.map((collection) => (
              <CarouselItem
                key={collection.id}
                className="pl-4 md:pl-6 basis-[85vw] sm:basis-[60vw] md:basis-[45vw] lg:basis-[35vw] xl:basis-[30vw]"
              >
                <Link
                  href={`/products?collection=${collection.slug}`}
                  className="block relative group overflow-hidden h-[60vh] md:h-[65vh] xl:h-[70vh] rounded-2xl select-none"
                  draggable={false}
                >
                  <motion.img
                    src={
                      collection.image_url ||
                      "https://images.unsplash.com/photo-1618202133208-2907bebba9e1?q=80&w=1600"
                    }
                    alt={collection.name}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-1200 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                    style={{ objectPosition }}
                  />

                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90 md:opacity-80 md:group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-black/20 md:group-hover:bg-black/0 transition-colors duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 xl:p-10">
                    <h3 className="text-primary-foreground text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mb-2 md:mb-3 md:translate-y-3 md:group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                      {collection?.name || ""}
                    </h3>

                    <div className="overflow-hidden">
                      <p className="text-muted/90 line-clamp-2 text-sm md:text-base mb-4 md:mb-6 md:opacity-0 md:translate-y-8 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-600 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-75">
                        {collection?.description || ""}
                      </p>
                    </div>

                    <div className="overflow-hidden">
                      <div className="text-muted/90 flex items-center gap-2 font-medium md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-600 ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-150">
                        <span>Nhấn để xem chi tiết</span>
                        <ArrowRight className="size-4 md:size-5 md:group-hover:translate-x-1.5 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}

            <CarouselItem className="pl-0 basis-4 md:basis-6 lg:basis-8 pointer-events-none select-none shrink-0" />
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};
