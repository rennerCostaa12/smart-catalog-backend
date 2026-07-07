export type ProductResponse = {
  id: number;
  name: string;
  description: string | null;
  value: number;
  imageUrl: string | null;
  categoriesId: number;
  catalogClientId: number;
  categoryName?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ListProductsByCatalogClientParams = {
  catalogClientName: string;
  categoriesId?: number;
  page: number;
  limit: number;
  searchProduct?: string;
};

export type PaginatedProductsResponse = {
  products: ProductResponse[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};
