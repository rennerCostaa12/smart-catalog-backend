import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

import { Product } from "../../products/models/Product";

export class CategoryProduct extends Model<
  InferAttributes<CategoryProduct>,
  InferCreationAttributes<CategoryProduct>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    CategoryProduct.init(
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "categories_products",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    CategoryProduct.hasMany(Product, {
      as: "products",
      foreignKey: "categoriesId",
    });
  }
}
