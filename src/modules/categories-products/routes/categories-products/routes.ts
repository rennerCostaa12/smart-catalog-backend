import { NextFunction, Request, Response, Router } from "express";

import { requireAdminAuth } from "../../../../shared/middlewares/require-admin-auth";
import { CategoriesProductsController } from "../../controllers/CategoriesProductsController";
import { AsyncRouteHandler } from "./types";

const asyncHandler =
  (handler: AsyncRouteHandler) =>
  (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response, next).catch(next);
  };

const categoriesProductsController = new CategoriesProductsController();

export const categoriesProductsRoutes = Router();

categoriesProductsRoutes.use(requireAdminAuth);

categoriesProductsRoutes.get(
  "/",
  asyncHandler((request, response) =>
    categoriesProductsController.list(request, response),
  ),
);
