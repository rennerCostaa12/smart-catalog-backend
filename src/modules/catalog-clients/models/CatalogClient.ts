import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";

import { Admin } from "../../admin/models/Admin";
import { Order } from "../../orders/models/Order";
import { Payment } from "../../payments/models/Payment";
import { Product } from "../../products/models/Product";

export class CatalogClient extends Model<
  InferAttributes<CatalogClient>,
  InferCreationAttributes<CatalogClient>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare slug: string;
  declare description: CreationOptional<string | null>;
  declare admins?: NonAttribute<Admin[]>;
  declare products?: NonAttribute<Product[]>;
  declare payments?: NonAttribute<Payment[]>;
  declare orders?: NonAttribute<Order[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    CatalogClient.init(
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
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
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
        tableName: "catalog_client",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    CatalogClient.hasMany(Admin, {
      as: "admins",
      foreignKey: "catalogClientId",
    });

    CatalogClient.hasMany(Product, {
      as: "products",
      foreignKey: "catalogClientId",
    });

    CatalogClient.hasMany(Payment, {
      as: "payments",
      foreignKey: "catalogClientId",
    });

    CatalogClient.hasMany(Order, {
      as: "orders",
      foreignKey: "catalogClientId",
    });
  }
}
