import { Request, Response } from "express";

import { CreateUserService } from "../services/CreateUserService";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";
import { verifyAuthToken } from "../../../shared/security/auth-token";
import { getBearerToken } from "../../../utils/get-bearer-token";
import { UpdateUserService } from "../services/UpdateUserService";

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
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

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserService = new UpdateUserService();

      const userId = Number(request?.params?.userId);
      const authorization = request.headers.authorization;

      const userUpdated = await updateUserService.execute(
        request?.body,
        userId,
        authorization,
      );

      return successResponse({
        response,
        statusCode: HttpStatusCode.OK,
        message: "Usuário atualizado com sucesso.",
        data: userUpdated,
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
