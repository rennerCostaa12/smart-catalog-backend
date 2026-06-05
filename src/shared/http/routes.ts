import { Router } from "express";

import { authRoutes } from "../../modules/auth/routes/auth/routes";
import { paymentsRoutes } from "../../modules/payments/routes/payments/routes";
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
