import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";
import { PaymentReversalWebhookService } from "../service/PaymentReversalWebhookService";

export class PaymentReversalWebhookController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const paymentReversalWebhookService = new PaymentReversalWebhookService();
      const result = await paymentReversalWebhookService.execute(request.body);

      return successResponse({
        response,
        statusCode: HttpStatusCode.OK,
        message: result.updated
          ? "Estorno processado com sucesso."
          : "Webhook recebido e ignorado.",
        data: result,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return errorResponse({
          response,
          statusCode: error.statusCode,
          message: error.message,
        });
      }

      return errorResponse({
        response,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: "Erro interno do servidor.",
      });
    }
  }
}
