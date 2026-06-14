import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";

import { CatalogClient } from "../../catalog-clients/models/CatalogClient";
import { CategoryProduct } from "../../categories-products/models/CategoryProduct";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: CreationOptional<string | null>;
  declare value: number;
  declare imageUrl: CreationOptional<string | null>;
  declare categoriesId: number;
  declare catalogClientId: number;
  declare category?: NonAttribute<CategoryProduct>;
  declare catalogClient?: NonAttribute<CatalogClient>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        value: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: true,
          field: "image_url",
        },
        categoriesId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "categories_id",
        },
        catalogClientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "catalog_client_id",
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "products",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    Product.belongsTo(CategoryProduct, {
      as: "category",
      foreignKey: "categoriesId",
    });

    Product.belongsTo(CatalogClient, {
      as: "catalogClient",
      foreignKey: "catalogClientId",
    });
  }
}
