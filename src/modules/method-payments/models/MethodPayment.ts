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

export class MethodPayment extends Model<
  InferAttributes<MethodPayment>,
  InferCreationAttributes<MethodPayment>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: CreationOptional<string | null>;
  declare payments?: NonAttribute<Payment[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    MethodPayment.init(
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
        tableName: "method_payments",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    MethodPayment.hasMany(Payment, {
      as: "payments",
      foreignKey: "methodPaymentId",
    });
  }
}
