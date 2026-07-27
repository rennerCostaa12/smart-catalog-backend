import { Request, Response } from "express";
import { ConfirmPaymentWebhookService } from "../service/ConfirmPaymentWebhookService";
import { errorResponse, successResponse } from "../../../shared/http/responses";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { AppError } from "../../../shared/errors/AppError";

export class ConfirmPaymentWebhookController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const confirmPaymentWebhookService = new ConfirmPaymentWebhookService();
      const result = await confirmPaymentWebhookService.execute(request.body);

      return successResponse({
        response,
        statusCode: HttpStatusCode.OK,
        message: result.updated
          ? "Pagamento confirmado com sucesso."
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
