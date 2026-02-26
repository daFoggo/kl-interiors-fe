"use server";
import { cache } from "react";
import { publicApiClient } from "@/lib/public-ky";
import { PRODUCT_CATEGORIES_ENDPOINTS } from "./api";
import type { IGetPopularProductCategoriesResponse } from "./types";

export const getPopularProductCategories = cache(
  async (limit = 8): Promise<IGetPopularProductCategoriesResponse> => {
    try {
      return await publicApiClient
        .get(PRODUCT_CATEGORIES_ENDPOINTS.POPULAR, { searchParams: { limit } })
        .json<IGetPopularProductCategoriesResponse>();
    } catch {
      return { success: false, payload: [] };
    }
  },
);
