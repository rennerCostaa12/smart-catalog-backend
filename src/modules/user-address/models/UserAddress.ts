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
import { User } from "../../users/models/User";

export class UserAddress extends Model<
  InferAttributes<UserAddress>,
  InferCreationAttributes<UserAddress>
> {
  declare id: CreationOptional<number>;
  declare label: string;
  declare address: string;
  declare neighborhood: string;
  declare complement: string | null;
  declare city: string;
  declare state: string;
  declare number: number;
  declare postalCode: string;
  declare userId: number;
  declare user?: NonAttribute<User>;
  declare orders?: NonAttribute<Order[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    UserAddress.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        label: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        neighborhood: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        complement: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        state: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        postalCode: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "postal_code",
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "user_id",
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "user_address",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    UserAddress.belongsTo(User, {
      as: "user",
      foreignKey: "userId",
    });

    UserAddress.hasMany(Order, {
      as: "orders",
      foreignKey: "userAddressId",
    });
  }
}
