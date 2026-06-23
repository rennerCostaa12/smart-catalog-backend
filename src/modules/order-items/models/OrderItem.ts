import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";

import { Order } from "../../orders/models/Order";
import { Product } from "../../products/models/Product";

export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  declare id: CreationOptional<string>;
  declare orderId: string;
  declare productId: number;
  declare quantity: number;
  declare unitPrice: number;
  declare subtotal: number;
  declare order?: NonAttribute<Order>;
  declare product?: NonAttribute<Product>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    OrderItem.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        orderId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: "order_id",
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "product_id",
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        unitPrice: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          field: "unit_price",
        },
        subtotal: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "order_items",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    OrderItem.belongsTo(Order, {
      as: "order",
      foreignKey: "orderId",
    });

    OrderItem.belongsTo(Product, {
      as: "product",
      foreignKey: "productId",
    });
  }
}
