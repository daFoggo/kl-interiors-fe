import { publicApiClient } from "@/lib/public-ky";
import type { IGetPageProductTypesResponse } from "./types";

export const PRODUCT_TYPES_ENDPOINTS = {
  GET_PAGE: "product-types",
  GET_BY_ID: (type_id: string) => `product-types/${type_id}`,
  CREATE: "product-types",
  UPDATE: (type_id: string) => `product-types/${type_id}`,
  DELETE: (type_id: string) => `product-types/${type_id}`,
} as const;

export const productTypesApi = {
  getProductTypes: async (
    limit = 10,
  ): Promise<IGetPageProductTypesResponse> => {
    return await publicApiClient
      .get(PRODUCT_TYPES_ENDPOINTS.GET_PAGE, { searchParams: { size: limit } })
      .json<IGetPageProductTypesResponse>();
  },
};
