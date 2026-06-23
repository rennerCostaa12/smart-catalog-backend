import { NextFunction, Request, Response, Router } from "express";

import { requireAdminAuth } from "../../../../shared/middlewares/require-admin-auth";
import { requireAuth } from "../../../../shared/middlewares/require-auth";
import { validateSchema } from "../../../../shared/middlewares/validate-schema";
import { OrdersController } from "../../controllers/OrdersController";
import { createOrderSchema } from "../../validators/create-order.schema";
import { AsyncRouteHandler } from "./types";

const asyncHandler =
  (handler: AsyncRouteHandler) =>
  (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response, next).catch(next);
  };

const ordersController = new OrdersController();

export const ordersRoutes = Router();

ordersRoutes.use(requireAuth);

ordersRoutes.post(
  "/:userId/",
  asyncHandler(validateSchema(createOrderSchema)),
  asyncHandler((request, response) =>
    ordersController.create(request, response),
  ),
);

ordersRoutes.get(
  "/:userId/",
  asyncHandler((request, response) => ordersController.list(request, response)),
);

ordersRoutes.get(
  "/:userId/:id",
  asyncHandler((request, response) => ordersController.get(request, response)),
);

// TODO: implementar futuramente
// ordersRoutes.put(
//   "/:userId/:id",
//   asyncHandler(validateSchema(updateOrderSchema)),
//   asyncHandler((request, response) =>
//     ordersController.update(request, response),
//   ),
// );

// TODO: implementar futuramente
// ordersRoutes.patch(
//   "/:userId/:id",
//   asyncHandler(validateSchema(updateOrderSchema)),
//   asyncHandler((request, response) =>
//     ordersController.update(request, response),
//   ),
// );

ordersRoutes.delete(
  "/:userId/:id",
  requireAdminAuth,
  asyncHandler((request, response) =>
    ordersController.delete(request, response),
  ),
);
