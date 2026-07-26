import { Request, Response } from "express";

import { AuthService } from "../services/AuthService/AuthService";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";

export class LogoutController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const authService = new AuthService();
      const responseService = await authService.logout(response);

      return successResponse({
        response: responseService,
        statusCode: HttpStatusCode.OK,
        message: "Logout efetuado com sucesso.",
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
