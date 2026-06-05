import { Sequelize } from "sequelize";

import { Admin } from "../modules/admin/models/Admin";
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

const models: Array<{ initialize: (sequelize: Sequelize) => void }> = [
  User,
  Admin,
];

export const initializeDatabase = async (): Promise<void> => {
  models.forEach((model) => model.initialize(sequelize));

  await sequelize.authenticate();
  await sequelize.sync();
};
