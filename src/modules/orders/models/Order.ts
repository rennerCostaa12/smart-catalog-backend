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
import { MethodPayment } from "../../method-payments/models/MethodPayment";
import { OrderItem } from "../../order-items/models/OrderItem";
import { StatusOrder } from "../../status-orders/models/StatusOrder";
import { User } from "../../users/models/User";
import { DeliveryMethodEnum } from "../constants";

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<string>;
  declare userId: number;
  declare catalogClientId: number;
  declare total: number;
  declare statusOrderId: number;
  declare methodPaymentId: number;
  declare deliveryMethod: DeliveryMethodEnum;
  declare user?: NonAttribute<User>;
  declare catalogClient?: NonAttribute<CatalogClient>;
  declare statusOrder?: NonAttribute<StatusOrder>;
  declare methodPayment?: NonAttribute<MethodPayment>;
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
        methodPaymentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "method_payment_id",
        },
        deliveryMethod: {
          type: DataTypes.ENUM("RETIRADA", "ENTREGA"),
          allowNull: false,
          field: "delivery_method",
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

    Order.belongsTo(MethodPayment, {
      as: "methodPayment",
      foreignKey: "methodPaymentId",
    });

    Order.hasMany(OrderItem, {
      as: "items",
      foreignKey: "orderId",
    });
  }
}
