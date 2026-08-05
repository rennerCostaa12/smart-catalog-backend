import { NextFunction, Request, Response, Router } from "express";

import { requireAuth } from "../../../../shared/middlewares/require-auth";
import { validateSchema } from "../../../../shared/middlewares/validate-schema";
import { AsyncRouteHandler } from "../../../../types/async_route_handler";
import { UserAddressController } from "../../controllers/UserAddressController";
import { createUserAddressSchema } from "../../validators/create-user-address.schema";
import { updateUserAddressSchema } from "../../validators/update-user-address.schema";

const asyncHandler =
  (handler: AsyncRouteHandler) =>
  (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response, next).catch(next);
  };

const userAddressController = new UserAddressController();

export const userAddressRoutes = Router();

userAddressRoutes.use(requireAuth);

userAddressRoutes.post(
  "/",
  asyncHandler(validateSchema(createUserAddressSchema)),
  asyncHandler((request, response) =>
    userAddressController.create(request, response),
  ),
);

userAddressRoutes.get(
  "/user/:userId",
  asyncHandler((request, response) =>
    userAddressController.listByUser(request, response),
  ),
);

userAddressRoutes.get(
  "/:id",
  asyncHandler((request, response) =>
    userAddressController.get(request, response),
  ),
);

userAddressRoutes.patch(
  "/:id",
  asyncHandler(validateSchema(updateUserAddressSchema)),
  asyncHandler((request, response) =>
    userAddressController.update(request, response),
  ),
);

userAddressRoutes.put(
  "/:id",
  asyncHandler(validateSchema(updateUserAddressSchema)),
  asyncHandler((request, response) =>
    userAddressController.update(request, response),
  ),
);

userAddressRoutes.delete(
  "/:id",
  asyncHandler((request, response) =>
    userAddressController.delete(request, response),
  ),
);
