// TODO: futura implementação dos endpoints de order-items

// import { NextFunction, Request, Response, Router } from "express";

// import { requireAuth } from "../../../../shared/middlewares/require-auth";
// import { validateSchema } from "../../../../shared/middlewares/validate-schema";
// import { OrderItemsController } from "../../controllers/OrderItemsController";
// import { createOrderItemSchema } from "../../validators/create-order-item.schema";
// import { updateOrderItemSchema } from "../../validators/update-order-item.schema";
// import { AsyncRouteHandler } from "./types";

// const asyncHandler =
//   (handler: AsyncRouteHandler) =>
//   (request: Request, response: Response, next: NextFunction): void => {
//     handler(request, response, next).catch(next);
//   };

// const orderItemsController = new OrderItemsController();

// export const orderItemsRoutes = Router();

// orderItemsRoutes.use(requireAuth);

// orderItemsRoutes.post(
//   "/:orderId/",
//   asyncHandler(validateSchema(createOrderItemSchema)),
//   asyncHandler((request, response) =>
//     orderItemsController.create(request, response),
//   ),
// );

// orderItemsRoutes.get(
//   "/:orderId/",
//   asyncHandler((request, response) =>
//     orderItemsController.list(request, response),
//   ),
// );

// orderItemsRoutes.get(
//   "/:orderId/:id",
//   asyncHandler((request, response) =>
//     orderItemsController.get(request, response),
//   ),
// );

// orderItemsRoutes.put(
//   "/:orderId/:id",
//   asyncHandler(validateSchema(updateOrderItemSchema)),
//   asyncHandler((request, response) =>
//     orderItemsController.update(request, response),
//   ),
// );

// orderItemsRoutes.patch(
//   "/:orderId/:id",
//   asyncHandler(validateSchema(updateOrderItemSchema)),
//   asyncHandler((request, response) =>
//     orderItemsController.update(request, response),
//   ),
// );

// orderItemsRoutes.delete(
//   "/:orderId/:id",
//   asyncHandler((request, response) =>
//     orderItemsController.delete(request, response),
//   ),
// );
