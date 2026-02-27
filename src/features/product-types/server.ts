"use server";
import { cache } from "react";
import { productTypesApi } from "./api";
import type { IProductType } from "./types";

export const getProductTypesServer = cache(
  async (limit = 10): Promise<IProductType[]> => {
    try {
      const response = await productTypesApi.getProductTypes(limit);
      return response.success ? response.payload : [];
    } catch (error) {
      console.error("Failed to fetch product types", error);
      return [];
    }
  },
);
