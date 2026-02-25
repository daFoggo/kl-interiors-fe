import { cache } from "react";
import { publicApiClient } from "@/lib/public-ky";
import { CATEGORIES_ENDPOINTS } from "./api";
import type { IGetPopularCategoriesResponse } from "./types";

export const getPopularCategories = cache(
  async (limit = 8): Promise<IGetPopularCategoriesResponse> => {
    return await publicApiClient
      .get(CATEGORIES_ENDPOINTS.POPULAR, { searchParams: { limit } })
      .json<IGetPopularCategoriesResponse>();
  },
);
