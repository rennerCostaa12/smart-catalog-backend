export interface CreateProductDTO {
  name: string;
  description?: string | null;
  value: number;
  image: Express.Multer.File;
  categoriesId: number;
  catalogClientId: number;
  isActive?: boolean;
}
