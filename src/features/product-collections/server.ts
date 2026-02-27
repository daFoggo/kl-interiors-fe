"use server";
import { cache } from "react";
import { productCollectionsApi } from "./api";
import type { IProductCollection } from "./types";

export const getProductCollectionsServer = cache(
  async (limit = 10): Promise<IProductCollection[]> => {
    try {
      const response = await productCollectionsApi.getProductCollections(limit);
      return response.success ? response.payload.data : [];
    } catch (error) {
      console.error("Failed to fetch product collections", error);
      return [];
    }
  },
);
