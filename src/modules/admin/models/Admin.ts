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

export class Admin extends Model<
  InferAttributes<Admin>,
  InferCreationAttributes<Admin>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare document: string;
  declare email: string;
  declare phone: string;
  declare catalogClientId: number;
  declare passwordHash: string;
  declare catalogClient?: NonAttribute<CatalogClient>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize): void {
    Admin.init(
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
        document: {
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
        catalogClientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "catalog_client_id",
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "password_hash",
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "admin",
        underscored: true,
      },
    );
  }

  public static associate(): void {
    Admin.belongsTo(CatalogClient, {
      as: "catalogClient",
      foreignKey: "catalogClientId",
    });
  }
}
