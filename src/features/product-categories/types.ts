import type { IPagination } from "@/types/pagination";

export interface IProductCategory {
  id: string;
  parent_id?: string | null;
  name: string;
  slug: string | null;
  description?: string | null;
  image_url?: string | null;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type ICreateProductCategoryPayload = Omit<
  IProductCategory,
  "id" | "slug" | "created_at" | "updated_at"
>;

export interface ICreateProductCategoryResponse {
  success: boolean;
  payload: IProductCategory;
}

export type IUpdateProductCategoryPayload = Partial<IProductCategory>;

export interface IUpdateProductCategoryResponse {
  success: boolean;
  payload: IProductCategory;
}

export interface IGetPageProductCategoriesResponse {
  success: boolean;
  payload: {
    data: IProductCategory[];
    pagination: IPagination;
  };
}

export interface IGetPopularProductCategoriesResponse {
  success: boolean;
  payload: IProductCategory[];
}

export interface IDeleteProductCategoryResponse {
  success: boolean;
  payload: null;
}
