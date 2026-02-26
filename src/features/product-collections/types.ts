export interface IProductCollection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}
