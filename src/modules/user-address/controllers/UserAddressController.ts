import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";
import { CreateUserAddressService } from "../services/CreateUserAddressService";
import { DeleteUserAddressService } from "../services/DeleteUserAddressService";
import { GetUserAddressService } from "../services/GetUserAddressService";
import { ListUserAddressesService } from "../services/ListUserAddressesService";
import { UpdateUserAddressService } from "../services/UpdateUserAddressService";

export class UserAddressController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const userAddress = await new CreateUserAddressService().execute(
        request.body,
        request.cookies.access_token,
      );

      return successResponse({
        response,
        statusCode: HttpStatusCode.CREATED,
        message: "Endereço cadastrado com sucesso.",
        data: userAddress,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async listByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const userId = this.getRequiredIdParam(request, "userId");
      const userAddresses = await new ListUserAddressesService().execute(
        userId,
        request.cookies.access_token,
      );

      return successResponse({
        response,
        message: "Endereços listados com sucesso.",
        data: userAddresses,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const id = this.getRequiredIdParam(request, "id");
      const userAddress = await new GetUserAddressService().execute(
        id,
        request.cookies.access_token,
      );

      return successResponse({
        response,
        message: "Endereço encontrado com sucesso.",
        data: userAddress,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const id = this.getRequiredIdParam(request, "id");
      const userAddress = await new UpdateUserAddressService().execute(
        id,
        request.body,
        request.cookies.access_token,
      );

      return successResponse({
        response,
        message: "Endereço atualizado com sucesso.",
        data: userAddress,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const id = this.getRequiredIdParam(request, "id");

      await new DeleteUserAddressService().execute(
        id,
        request.cookies.access_token,
      );

      return successResponse({
        response,
        message: "Endereço deletado com sucesso.",
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  private handleError(error: unknown, response: Response): Response {
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

  private getRequiredIdParam(request: Request, paramName: string): number {
    const id = Number(request.params[paramName]);

    if (!request.params[paramName] || !Number.isInteger(id) || id <= 0) {
      throw new AppError(
        `O parâmetro ${paramName} é obrigatório.`,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    return id;
  }
}
