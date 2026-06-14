import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";

import { Payment } from "../../payments/models/Payment";

export class StatusPayment extends Model<
  InferAttributes<StatusPayment>,
  InferCreationAttributes<StatusPayment>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare payments?: NonAttribute<Payment[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    StatusPayment.init(
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "status_payment",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    StatusPayment.hasMany(Payment, {
      as: "payments",
      foreignKey: "statusPaymentId",
    });
  }
}
