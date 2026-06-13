import { NextFunction, Request, Response, Router } from "express";

//import { requireAdminAuth } from "../../../../shared/middlewares/require-admin-auth";
import { validateSchema } from "../../../../shared/middlewares/validate-schema";
import { CatalogClientsController } from "../../controllers/CatalogClientsController";
import { createCatalogClientSchema } from "../../validators/create-catalog-client.schema";
import { updateCatalogClientSchema } from "../../validators/update-catalog-client.schema";
import { AsyncRouteHandler } from "./types";

const asyncHandler =
  (handler: AsyncRouteHandler) =>
  (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response, next).catch(next);
  };

const catalogClientsController = new CatalogClientsController();

export const catalogClientsRoutes = Router();

// TODO: Implementar futuramente
//catalogClientsRoutes.use(requireAdminAuth);

catalogClientsRoutes.post(
  "/",
  asyncHandler(validateSchema(createCatalogClientSchema)),
  asyncHandler((request, response) =>
    catalogClientsController.create(request, response),
  ),
);

catalogClientsRoutes.get(
  "/",
  asyncHandler((request, response) =>
    catalogClientsController.list(request, response),
  ),
);

catalogClientsRoutes.get(
  "/:id",
  asyncHandler((request, response) =>
    catalogClientsController.get(request, response),
  ),
);

catalogClientsRoutes.put(
  "/:id",
  asyncHandler(validateSchema(updateCatalogClientSchema)),
  asyncHandler((request, response) =>
    catalogClientsController.update(request, response),
  ),
);

catalogClientsRoutes.patch(
  "/:id",
  asyncHandler(validateSchema(updateCatalogClientSchema)),
  asyncHandler((request, response) =>
    catalogClientsController.update(request, response),
  ),
);

catalogClientsRoutes.delete(
  "/:id",
  asyncHandler((request, response) =>
    catalogClientsController.delete(request, response),
  ),
);
