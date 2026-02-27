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
  GET_BY_ID: (category_id: string) => `product-categories/${category_id}`,
  POPULAR: "product-categories/popular",
  CREATE: "product-categories",
  UPDATE: (category_id: string) => `product-categories/${category_id}`,
  DELETE: (category_id: string) => `product-categories/${category_id}`,
  PRODUCTS: (category_id: string) =>
    `product-categories/${category_id}/products`,
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
    category_id: string,
  ): Promise<ICreateProductCategoryResponse> => {
    return await publicApiClient
      .get(PRODUCT_CATEGORIES_ENDPOINTS.GET_BY_ID(category_id))
      .json<ICreateProductCategoryResponse>();
  },

  updateProductCategory: async (
    category_id: string,
    payload: IUpdateProductCategoryPayload,
  ): Promise<IUpdateProductCategoryResponse> => {
    return await authedApiClient
      .put(PRODUCT_CATEGORIES_ENDPOINTS.UPDATE(category_id), { json: payload })
      .json<IUpdateProductCategoryResponse>();
  },

  deleteProductCategory: async (
    category_id: string,
  ): Promise<IDeleteProductCategoryResponse> => {
    return await authedApiClient
      .delete(PRODUCT_CATEGORIES_ENDPOINTS.DELETE(category_id))
      .json<IDeleteProductCategoryResponse>();
  },

  getProductCategoryProducts: async (category_id: string) => {
    return await publicApiClient
      .get(PRODUCT_CATEGORIES_ENDPOINTS.PRODUCTS(category_id))
      .json();
  },
};
