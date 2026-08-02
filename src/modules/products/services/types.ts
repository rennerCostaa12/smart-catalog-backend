export type ProductResponse = {
  id: number;
  name: string;
  description: string | null;
  value: number;
  imageUrl: string | null;
  stock: number;
  categoriesId: number;
  catalogClientId: number;
  isActive: boolean;
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
  showAllProduct?: boolean;
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
