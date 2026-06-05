import { Request, Response } from "express";

import { UserAuthService } from "../services/UserAuthService/UserAuthService";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";

export class RegisterUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userAuthService = new UserAuthService();
      const auth = await userAuthService.register(request.body);

      return successResponse({
        response,
        statusCode: HttpStatusCode.CREATED,
        message: "Usuário cadastrado com sucesso.",
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
