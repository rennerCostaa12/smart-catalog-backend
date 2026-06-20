import { Sequelize } from "sequelize";

import { Admin } from "../modules/admin/models/Admin";
import { CatalogClient } from "../modules/catalog-clients/models/CatalogClient";
import { CategoryProduct } from "../modules/categories-products/models/CategoryProduct";
import { MethodPayment } from "../modules/method-payments/models/MethodPayment";
import { OrderItem } from "../modules/order-items/models/OrderItem";
import { Order } from "../modules/orders/models/Order";
import { Payment } from "../modules/payments/models/Payment";
import { Product } from "../modules/products/models/Product";
import { StatusOrder } from "../modules/status-orders/models/StatusOrder";
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
  StatusOrder,
  Payment,
  Order,
  OrderItem,
];

export const initializeDatabase = async (): Promise<void> => {
  models.forEach((model) => model.initialize(sequelize));
  models.forEach((model) => model.associate?.());

  await sequelize.authenticate();
  await sequelize.sync();
};
