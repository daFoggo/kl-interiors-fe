import type { IProductCategory } from "../product-categories";
import type { IProductCollection } from "../product-collections";
import type { IProductColor } from "../product-colors";
import type { IProductMaterial } from "../product-materials";
import type { IProductType } from "../product-types";

export interface IProduct {
  // base info
  id: string;
  name: string;
  slug: string;
  description?: string;
  dimensions?: string;
  price: number;
  stock_quantity?: number;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  is_featured?: boolean;
  images?: string[];

  // relations info
  product_type_id?: string;
  product_type?: IProductType;
  category_id?: string;
  category?: IProductCategory;
  product_colors?: IProductColor[];
  product_materials?: IProductMaterial[];
  product_collections?: IProductCollection[];

  // timestamps
  created_at?: string;
  updated_at?: string;
}
