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

export class StatusOrder extends Model<
  InferAttributes<StatusOrder>,
  InferCreationAttributes<StatusOrder>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare orders?: NonAttribute<Order[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    StatusOrder.init(
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
        tableName: "status_order",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    StatusOrder.hasMany(Order, {
      as: "orders",
      foreignKey: "statusOrderId",
    });
  }
}
