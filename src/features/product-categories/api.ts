import { authedApiClient } from "@/lib/authed-ky";
import { publicApiClient } from "@/lib/public-ky";
import type {
  ICreateProductCategoryPayload,
  ICreateProductCategoryResponse,
  IDeleteProductCategoryResponse,
  IGetPageProductCategoriesResponse,
  IGetPopularProductCategoriesResponse,
  IUpdateProductCategoryPayload,
  IUpdateProductCategoryResponse,
} from "./types";

export const PRODUCT_CATEGORIES_ENDPOINTS = {
  GET_PAGE: "product-categories",
  GET_BY_ID: (categoryId: string) => `product-categories/${categoryId}`,
  POPULAR: "product-categories/popular",
  CREATE: "product-categories",
  UPDATE: (categoryId: string) => `product-categories/${categoryId}`,
  DELETE: (categoryId: string) => `product-categories/${categoryId}`,
  PRODUCTS: (categoryId: string) => `product-categories/${categoryId}/products`,
} as const;

export const productCategoriesApi = {
  getProductCategories:
    async (): Promise<IGetPageProductCategoriesResponse> => {
      return await publicApiClient
        .get(PRODUCT_CATEGORIES_ENDPOINTS.GET_PAGE)
        .json<IGetPageProductCategoriesResponse>();
    },

  getPopularProductCategories: async (
    limit = 6,
  ): Promise<IGetPopularProductCategoriesResponse> => {
    return await publicApiClient
      .get(PRODUCT_CATEGORIES_ENDPOINTS.POPULAR, { searchParams: { limit } })
      .json<IGetPopularProductCategoriesResponse>();
  },

  createProductCategory: async (
    payload: ICreateProductCategoryPayload,
  ): Promise<ICreateProductCategoryResponse> => {
    return await authedApiClient
      .post(PRODUCT_CATEGORIES_ENDPOINTS.CREATE, { json: payload })
      .json<ICreateProductCategoryResponse>();
  },

  getProductCategory: async (
    categoryId: string,
  ): Promise<ICreateProductCategoryResponse> => {
    return await publicApiClient
      .get(PRODUCT_CATEGORIES_ENDPOINTS.GET_BY_ID(categoryId))
      .json<ICreateProductCategoryResponse>();
  },

  updateProductCategory: async (
    categoryId: string,
    payload: IUpdateProductCategoryPayload,
  ): Promise<IUpdateProductCategoryResponse> => {
    return await authedApiClient
      .put(PRODUCT_CATEGORIES_ENDPOINTS.UPDATE(categoryId), { json: payload })
      .json<IUpdateProductCategoryResponse>();
  },

  deleteProductCategory: async (
    categoryId: string,
  ): Promise<IDeleteProductCategoryResponse> => {
    return await authedApiClient
      .delete(PRODUCT_CATEGORIES_ENDPOINTS.DELETE(categoryId))
      .json<IDeleteProductCategoryResponse>();
  },

  getProductCategoryProducts: async (categoryId: string) => {
    return await publicApiClient
      .get(PRODUCT_CATEGORIES_ENDPOINTS.PRODUCTS(categoryId))
      .json();
  },
};
