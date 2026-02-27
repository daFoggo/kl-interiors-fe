import { publicApiClient } from "@/lib/public-ky";
import type { IGetPageProductCollectionsResponse } from "./types";

export const PRODUCT_COLLECTIONS_ENDPOINTS = {
  GET_PAGE: "product-collections",
  GET_BY_ID: (collection_id: string) => `product-collections/${collection_id}`,
  CREATE: "product-collections",
  UPDATE: (collection_id: string) => `product-collections/${collection_id}`,
  DELETE: (collection_id: string) => `product-collections/${collection_id}`,
} as const;

export const productCollectionsApi = {
  getProductCollections: async (
    limit = 10,
  ): Promise<IGetPageProductCollectionsResponse> => {
    return await publicApiClient
      .get(PRODUCT_COLLECTIONS_ENDPOINTS.GET_PAGE, {
        searchParams: { size: limit },
      })
      .json<IGetPageProductCollectionsResponse>();
  },
};
