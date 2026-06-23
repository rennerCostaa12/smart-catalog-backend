import { Router } from "express";

import { authRoutes } from "../../modules/auth/routes/auth/routes";
import { catalogClientsRoutes } from "../../modules/catalog-clients/routes/catalog-clients/routes";
import { ordersRoutes } from "../../modules/orders/routes/orders/routes";
import { paymentsRoutes } from "../../modules/payments/routes/payments/routes";
import { productsRoutes } from "../../modules/products/routes/products/routes";
import { usersRoutes } from "../../modules/users/routes/users/routes";
import { HttpStatusCode } from "./HttpStatusCode";
import { successResponse } from "./responses";

export const routes = Router();

routes.get("/health", (_request, response) => {
  return successResponse({
    response,
    statusCode: HttpStatusCode.OK,
    message: "Ok.",
    data: { status: "ok" },
  });
});

routes.use("/api/payments", paymentsRoutes);
routes.use("/api/auth", authRoutes);
routes.use("/api/users", usersRoutes);
routes.use("/api/products", productsRoutes);
routes.use("/api/catalog-clients", catalogClientsRoutes);
routes.use("/api/orders", ordersRoutes);
