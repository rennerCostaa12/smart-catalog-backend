import { Sequelize } from "sequelize";

import { Admin } from "../modules/admin/models/Admin";
import { CatalogClient } from "../modules/catalog-clients/models/CatalogClient";
import { CategoryProduct } from "../modules/categories-products/models/CategoryProduct";
import { MethodPayment } from "../modules/method-payments/models/MethodPayment";
import { Payment } from "../modules/payments/models/Payment";
import { Product } from "../modules/products/models/Product";
import { StatusPayment } from "../modules/status-payments/models/StatusPayment";
import { User } from "../modules/users/models/User";
import { env } from "./env";

export const sequelize = new Sequelize(
  env.database.name,
  env.database.user,
  env.database.password,
  {
    dialect: "mysql",
    host: env.database.host,
    port: env.database.port,
    logging: false,
  },
);

type DatabaseModel = {
  initialize: (sequelize: Sequelize) => void;
  associate?: () => void;
};

const models: DatabaseModel[] = [
  User,
  Admin,
  CatalogClient,
  CategoryProduct,
  Product,
  MethodPayment,
  StatusPayment,
  Payment,
];

export const initializeDatabase = async (): Promise<void> => {
  models.forEach((model) => model.initialize(sequelize));
  models.forEach((model) => model.associate?.());

  await sequelize.authenticate();
  await sequelize.sync();
};
