import { Request, Response } from "express";

import { AsaasPaymentsService } from "../services/AsaasPaymentsService/AsaasPaymentsService";
import { AppError } from "../../../shared/errors/AppError";
import { AsaasHttpClient } from "../../../shared/integrations/asaas/AsaasHttpClient";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";

export class CreatePixPaymentController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const asaasHttpClient = new AsaasHttpClient();
      const asaasPaymentsService = new AsaasPaymentsService(asaasHttpClient);

      const payment = await asaasPaymentsService.createPixPayment(request.body);

      return successResponse({
        response,
        statusCode: HttpStatusCode.CREATED,
        message: "Pix criado com sucesso.",
        data: payment,
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
