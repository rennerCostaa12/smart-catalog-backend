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
import { StatusPayment } from "../../status-payments/models/StatusPayment";
import { User } from "../../users/models/User";

export class Payment extends Model<
  InferAttributes<Payment>,
  InferCreationAttributes<Payment>
> {
  declare id: CreationOptional<number>;
  declare methodPaymentId: number;
  declare userId: number;
  declare catalogClientId: number;
  declare amount: number;
  declare statusPaymentId: number;
  declare paidAt: CreationOptional<Date | null>;
  declare methodPayment?: NonAttribute<MethodPayment>;
  declare user?: NonAttribute<User>;
  declare catalogClient?: NonAttribute<CatalogClient>;
  declare statusPayment?: NonAttribute<StatusPayment>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    Payment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        methodPaymentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "method_payment_id",
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
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        statusPaymentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "status_payment_id",
        },
        paidAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "paid_at",
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "payments",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    Payment.belongsTo(MethodPayment, {
      as: "methodPayment",
      foreignKey: "methodPaymentId",
    });

    Payment.belongsTo(User, {
      as: "user",
      foreignKey: "userId",
    });

    Payment.belongsTo(CatalogClient, {
      as: "catalogClient",
      foreignKey: "catalogClientId",
    });

    Payment.belongsTo(StatusPayment, {
      as: "statusPayment",
      foreignKey: "statusPaymentId",
    });
  }
}
