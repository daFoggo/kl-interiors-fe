"use server";
import { cache } from "react";
import { toast } from "sonner";
import { productCategoriesApi } from "./api";
import type { IProductCategory } from "./types";

export const getPopularProductCategoriesServer = cache(
  async (limit = 8): Promise<IProductCategory[]> => {
    try {
      const response =
        await productCategoriesApi.getPopularProductCategories(limit);
      return response.success ? response.payload : [];
    } catch (error) {
      toast.error("Có lỗi khi lấy danh mục sản phẩm phổ biến");
      console.error("Failed to fetch popular product categories", error);
      return [];
    }
  },
);
