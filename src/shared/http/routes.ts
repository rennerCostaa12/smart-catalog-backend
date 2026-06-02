import { Router } from "express";

import { paymentsRoutes } from "../../modules/payments/routes/payments/routes";
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
