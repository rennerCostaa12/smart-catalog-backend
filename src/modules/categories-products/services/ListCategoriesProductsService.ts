import { CategoryProduct } from "../models/CategoryProduct";

export class ListCategoriesProductsService {
  public async execute() {
    const categoriesProducts = await CategoryProduct.findAll({
      order: [["id", "ASC"]],
    });

    return categoriesProducts.map((categoryProduct) => {
      return {
        id: categoryProduct?.id,
        name: categoryProduct?.name,
        description: categoryProduct?.description,
      };
    });
  }
}
