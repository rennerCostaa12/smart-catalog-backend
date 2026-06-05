import { Request, Response } from "express";

import { CreateUserService } from "../services/CreateUserService";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createUserService = new CreateUserService();
      const user = await createUserService.execute(request.body);

      return successResponse({
        response,
        statusCode: HttpStatusCode.CREATED,
        message: "Usuário cadastrado com sucesso.",
        data: user,
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
