import { NextFunction, Request, Response, Router } from "express";

import { CreateCreditCardPaymentController } from "../../controllers/CreateCreditCardPaymentController";
import { CreatePixPaymentController } from "../../controllers/CreatePixPaymentController";
import { GetPixQrCodeController } from "../../controllers/GetPixQrCodeController";
import { createCreditCardPaymentSchema } from "../../validators/create-credit-card-payment.schema";
import { createPixPaymentSchema } from "../../validators/create-pix-payment.schema";
import { validateSchema } from "../../../../shared/middlewares/validate-schema";
import { AsyncRouteHandler } from "./types";

const asyncHandler =
  (handler: AsyncRouteHandler) =>
  (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response, next).catch(next);
  };

const createPixPaymentController = new CreatePixPaymentController();
const createCreditCardPaymentController =
  new CreateCreditCardPaymentController();
const getPixQrCodeController = new GetPixQrCodeController();

export const paymentsRoutes = Router();

paymentsRoutes.post(
  "/pix",
  asyncHandler(validateSchema(createPixPaymentSchema)),
  asyncHandler((request, response) =>
    createPixPaymentController.handle(request, response),
  ),
);

paymentsRoutes.post(
  "/credit-card",
  asyncHandler(validateSchema(createCreditCardPaymentSchema)),
  asyncHandler((request, response) =>
    createCreditCardPaymentController.handle(request, response),
  ),
);

paymentsRoutes.get(
  "/pix/:paymentId/qrcode",
  asyncHandler((request, response) =>
    getPixQrCodeController.handle(request, response),
  ),
);
