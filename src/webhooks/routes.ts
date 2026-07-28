import { NextFunction, Request, Response, Router } from "express";
import { ConfirmPaymentWebhookController } from "./ConfirmPaymentWebhook/controller/ConfirmPaymentWebhookController";
import { PaymentReversalWebhookController } from "./PaymentReversalWebhook/controller/PaymentReversalWebhookController";
import { AsyncRouteHandler } from "../types/async_route_handler";

const asyncHandler =
  (handler: AsyncRouteHandler) =>
  (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response, next).catch(next);
  };

const confirmPaymentWebhookController = new ConfirmPaymentWebhookController();
const paymentReversalWebhookController = new PaymentReversalWebhookController();

export const webhookRoutes = Router();

webhookRoutes.post(
  "/asaas/confirm-payment",
  asyncHandler((request, response) =>
    confirmPaymentWebhookController.handle(request, response),
  ),
);

webhookRoutes.post(
  "/asaas/reverse-payment",
  asyncHandler((request, response) =>
    paymentReversalWebhookController.handle(request, response),
  ),
);
