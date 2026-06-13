import { NextFunction, Request, Response, Router } from "express";

import { requireAdminAuth } from "../../../../shared/middlewares/require-admin-auth";
import { validateSchema } from "../../../../shared/middlewares/validate-schema";
import { ProductsController } from "../../controllers/ProductsController";
import { createProductSchema } from "../../validators/create-product.schema";
import { updateProductSchema } from "../../validators/update-product.schema";
import { AsyncRouteHandler } from "./types";

const asyncHandler =
  (handler: AsyncRouteHandler) =>
  (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response, next).catch(next);
  };

const productsController = new ProductsController();

export const productsRoutes = Router();

productsRoutes.get(
  "/catalog-client/:catalog_client_name",
  asyncHandler((request, response) =>
    productsController.listByCatalogClient(request, response),
  ),
);

productsRoutes.use(requireAdminAuth);

productsRoutes.post(
  "/",
  asyncHandler(validateSchema(createProductSchema)),
  asyncHandler((request, response) =>
    productsController.create(request, response),
  ),
);

productsRoutes.get(
  "/",
  asyncHandler((request, response) =>
    productsController.list(request, response),
  ),
);

productsRoutes.get(
  "/:id",
  asyncHandler((request, response) =>
    productsController.get(request, response),
  ),
);

productsRoutes.put(
  "/:id",
  asyncHandler(validateSchema(updateProductSchema)),
  asyncHandler((request, response) =>
    productsController.update(request, response),
  ),
);

productsRoutes.patch(
  "/:id",
  asyncHandler(validateSchema(updateProductSchema)),
  asyncHandler((request, response) =>
    productsController.update(request, response),
  ),
);

productsRoutes.delete(
  "/:id",
  asyncHandler((request, response) =>
    productsController.delete(request, response),
  ),
);
