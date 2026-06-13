export interface CreateProductDTO {
  name: string;
  description?: string | null;
  value: number;
  imageUrl?: string | null;
  categoriesId: number;
  catalogClientId: number;
}
