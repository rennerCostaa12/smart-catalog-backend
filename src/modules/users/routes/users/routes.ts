import { NextFunction, Request, Response, Router } from "express";

import { CreateUserController } from "../../controllers/CreateUserController";
import { createUserSchema } from "../../validators/create-user.schema";
import { validateSchema } from "../../../../shared/middlewares/validate-schema";
import { AsyncRouteHandler } from "./types";

const asyncHandler =
  (handler: AsyncRouteHandler) =>
  (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response, next).catch(next);
  };

const createUserController = new CreateUserController();

export const usersRoutes = Router();

usersRoutes.post(
  "/",
  asyncHandler(validateSchema(createUserSchema)),
  asyncHandler((request, response) =>
    createUserController.handle(request, response),
  ),
);
