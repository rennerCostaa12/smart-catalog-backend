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
import { OrderItem } from "../../order-items/models/OrderItem";
import { StatusOrder } from "../../status-orders/models/StatusOrder";
import { User } from "../../users/models/User";

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<string>;
  declare userId: number;
  declare catalogClientId: number;
  declare total: number;
  declare statusOrderId: number;
  declare user?: NonAttribute<User>;
  declare catalogClient?: NonAttribute<CatalogClient>;
  declare statusOrder?: NonAttribute<StatusOrder>;
  declare items?: NonAttribute<OrderItem[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    Order.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "user_id",
        },
        catalogClientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "catalog_client_id",
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        statusOrderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "status_order_id",
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "orders",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    Order.belongsTo(User, {
      as: "user",
      foreignKey: "userId",
    });

    Order.belongsTo(CatalogClient, {
      as: "catalogClient",
      foreignKey: "catalogClientId",
    });

    Order.belongsTo(StatusOrder, {
      as: "statusOrder",
      foreignKey: "statusOrderId",
    });

    Order.hasMany(OrderItem, {
      as: "items",
      foreignKey: "orderId",
    });
  }
}
