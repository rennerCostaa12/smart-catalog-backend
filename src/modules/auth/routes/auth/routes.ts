import { NextFunction, Request, Response, Router } from "express";

import { LoginAdminController } from "../../controllers/LoginAdminController";
import { LoginUserController } from "../../controllers/LoginUserController";
import { RegisterAdminController } from "../../controllers/RegisterAdminController";
import { RegisterUserController } from "../../controllers/RegisterUserController";
import { loginSchema } from "../../validators/login.schema";
import { loginUserSchema } from "../../validators/login-user.schema";
import { registerAdminSchema } from "../../validators/register-admin.schema";
import { registerUserSchema } from "../../validators/register-user.schema";
import { validateSchema } from "../../../../shared/middlewares/validate-schema";
import { AsyncRouteHandler } from "./types";

const asyncHandler =
  (handler: AsyncRouteHandler) =>
  (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response, next).catch(next);
  };

const registerUserController = new RegisterUserController();
const loginUserController = new LoginUserController();
const registerAdminController = new RegisterAdminController();
const loginAdminController = new LoginAdminController();

export const authRoutes = Router();

authRoutes.post(
  "/users/register",
  asyncHandler(validateSchema(registerUserSchema)),
  asyncHandler((request, response) =>
    registerUserController.handle(request, response),
  ),
);

authRoutes.post(
  "/users/login",
  asyncHandler(validateSchema(loginUserSchema)),
  asyncHandler((request, response) =>
    loginUserController.handle(request, response),
  ),
);

authRoutes.post(
  "/admin/register",
  asyncHandler(validateSchema(registerAdminSchema)),
  asyncHandler((request, response) =>
    registerAdminController.handle(request, response),
  ),
);

authRoutes.post(
  "/admin/login",
  asyncHandler(validateSchema(loginSchema)),
  asyncHandler((request, response) =>
    loginAdminController.handle(request, response),
  ),
);
