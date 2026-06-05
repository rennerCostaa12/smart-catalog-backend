import { Request, Response } from "express";

import { AdminAuthService } from "../services/AdminAuthService/AdminAuthService";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";

export class LoginAdminController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const adminAuthService = new AdminAuthService();
      const auth = await adminAuthService.login(request.body);

      return successResponse({
        response,
        message: "Login de admin realizado com sucesso.",
        data: auth,
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
