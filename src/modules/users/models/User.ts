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
import { Payment } from "../../payments/models/Payment";
import { UserAddress } from "../../user-address/models/UserAddress";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare addresses?: NonAttribute<UserAddress[]>;
  declare payments?: NonAttribute<Payment[]>;
  declare orders?: NonAttribute<Order[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    User.init(
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "users",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    User.hasMany(Payment, {
      as: "payments",
      foreignKey: "userId",
    });

    User.hasMany(Order, {
      as: "orders",
      foreignKey: "userId",
    });

    User.hasMany(UserAddress, {
      as: "addresses",
      foreignKey: "userId",
    });
  }
}
