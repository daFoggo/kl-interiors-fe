import type { IPagination } from "@/types/pagination";

export interface ICategory {
  id?: string;
  parent_id?: string | null;
  name?: string;
  slug?: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type ICreateCategoryPayload = Partial<ICategory>;

export interface ICreateCategoryResponse {
  success: boolean;
  payload: ICategory;
}

export type IUpdateCategoryPayload = Partial<ICategory>;

export interface IUpdateCategoryResponse {
  success: boolean;
  payload: ICategory;
}

export interface IGetPageCategoriesResponse {
  success: boolean;
  payload: {
    data: ICategory[];
    pagination: IPagination;
  };
}

export interface IGetPopularCategoriesResponse {
  success: boolean;
  payload: ICategory[];
}

export interface IDeleteCategoryResponse {
  success: boolean;
  payload: null;
}
