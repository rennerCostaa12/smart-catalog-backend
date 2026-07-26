import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";
import { getRequestAuthToken } from "../../../utils/get-auth-token";
import { AuthMeService } from "../services/AuthMeService/AuthMeService";

export class MeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const authMeService = new AuthMeService();
      const token = getRequestAuthToken(request);
      const me = await authMeService.execute(token);

      return successResponse({
        response,
        statusCode: HttpStatusCode.OK,
        message: "Usuário autenticado recuperado com sucesso.",
        data: me,
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
