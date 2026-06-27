import { NextFunction, Request, Response, Router } from "express";

import { UsersController } from "../../controllers/UsersController";
import { createUserSchema } from "../../validators/create-user.schema";
import { updateUserSchema } from "../../validators/update-user.schema";
import { requireAuth } from "../../../../shared/middlewares/require-auth";
import { validateSchema } from "../../../../shared/middlewares/validate-schema";
import { AsyncRouteHandler } from "./types";

const asyncHandler =
  (handler: AsyncRouteHandler) =>
  (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response, next).catch(next);
  };

const usersController = new UsersController();

export const usersRoutes = Router();

usersRoutes.post(
  "/",
  asyncHandler(validateSchema(createUserSchema)),
  asyncHandler((request, response) =>
    usersController.create(request, response),
  ),
);

usersRoutes.patch(
  "/:userId",
  requireAuth,
  asyncHandler(validateSchema(updateUserSchema)),
  asyncHandler((request, response) =>
    usersController.update(request, response),
  ),
);
