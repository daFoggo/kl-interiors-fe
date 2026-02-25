import { authedApiClient } from "@/lib/authed-ky";
import { publicApiClient } from "@/lib/public-ky";
import type {
  ICreateCategoryPayload,
  ICreateCategoryResponse,
  IDeleteCategoryResponse,
  IGetPageCategoriesResponse,
  IGetPopularCategoriesResponse,
  IUpdateCategoryPayload,
  IUpdateCategoryResponse,
} from "./types";

export const CATEGORIES_ENDPOINTS = {
  GET_PAGE: "categories",
  GET_BY_ID: (categoryId: string) => `categories/${categoryId}`,
  POPULAR: "categories/popular",
  CREATE: "categories",
  UPDATE: (categoryId: string) => `categories/${categoryId}`,
  DELETE: (categoryId: string) => `categories/${categoryId}`,
  PRODUCTS: (categoryId: string) => `categories/${categoryId}/products`,
} as const;

export const categoriesApi = {
  getCategories: async (): Promise<IGetPageCategoriesResponse> => {
    return await publicApiClient
      .get(CATEGORIES_ENDPOINTS.GET_PAGE)
      .json<IGetPageCategoriesResponse>();
  },

  getPopularCategories: async (
    limit = 6,
  ): Promise<IGetPopularCategoriesResponse> => {
    return await publicApiClient
      .get(CATEGORIES_ENDPOINTS.POPULAR, { searchParams: { limit } })
      .json<IGetPopularCategoriesResponse>();
  },

  createCategory: async (
    payload: ICreateCategoryPayload,
  ): Promise<ICreateCategoryResponse> => {
    return await authedApiClient
      .post(CATEGORIES_ENDPOINTS.CREATE, { json: payload })
      .json<ICreateCategoryResponse>();
  },

  getCategory: async (categoryId: string): Promise<ICreateCategoryResponse> => {
    return await publicApiClient
      .get(CATEGORIES_ENDPOINTS.GET_BY_ID(categoryId))
      .json<ICreateCategoryResponse>();
  },

  updateCategory: async (
    categoryId: string,
    payload: IUpdateCategoryPayload,
  ): Promise<IUpdateCategoryResponse> => {
    return await authedApiClient
      .put(CATEGORIES_ENDPOINTS.UPDATE(categoryId), { json: payload })
      .json<IUpdateCategoryResponse>();
  },

  deleteCategory: async (
    categoryId: string,
  ): Promise<IDeleteCategoryResponse> => {
    return await authedApiClient
      .delete(CATEGORIES_ENDPOINTS.DELETE(categoryId))
      .json<IDeleteCategoryResponse>();
  },

  getCategoryProducts: async (categoryId: string) => {
    return await publicApiClient
      .get(CATEGORIES_ENDPOINTS.PRODUCTS(categoryId))
      .json();
  },
};
