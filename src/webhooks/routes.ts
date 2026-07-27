import { NextFunction, Request, Response, Router } from "express";
import { ConfirmPaymentWebhookController } from "./ConfirmPaymentWebhook/controller/ConfirmPaymentWebhookController";
import { AsyncRouteHandler } from "../types/async_route_handler";

const asyncHandler =
  (handler: AsyncRouteHandler) =>
  (request: Request, response: Response, next: NextFunction): void => {
    handler(request, response, next).catch(next);
  };

const confirmPaymentWebhookController = new ConfirmPaymentWebhookController();

export const webhookRoutes = Router();

webhookRoutes.post(
  "/asaas",
  asyncHandler((request, response) =>
    confirmPaymentWebhookController.handle(request, response),
  ),
);
