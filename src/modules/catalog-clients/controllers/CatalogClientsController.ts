import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";
import { CreateCatalogClientService } from "../services/CreateCatalogClientService";
import { DeleteCatalogClientService } from "../services/DeleteCatalogClientService";
import { GetCatalogClientService } from "../services/GetCatalogClientService";
import { ListCatalogClientsService } from "../services/ListCatalogClientsService";
import { UpdateCatalogClientService } from "../services/UpdateCatalogClientService";

export class CatalogClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const catalogClient = await new CreateCatalogClientService().execute(
        request.body,
      );

      return successResponse({
        response,
        statusCode: HttpStatusCode.CREATED,
        message: "Catálogo cadastrado com sucesso.",
        data: catalogClient,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async list(_request: Request, response: Response): Promise<Response> {
    try {
      const catalogClients = await new ListCatalogClientsService().execute();

      return successResponse({
        response,
        message: "Catálogos listados com sucesso.",
        data: catalogClients,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const catalogClient = await new GetCatalogClientService().execute(
        Number(request.params.id),
      );

      return successResponse({
        response,
        message: "Catálogo encontrado com sucesso.",
        data: catalogClient,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const catalogClient = await new UpdateCatalogClientService().execute(
        Number(request.params.id),
        request.body,
      );

      return successResponse({
        response,
        message: "Catálogo atualizado com sucesso.",
        data: catalogClient,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      await new DeleteCatalogClientService().execute(Number(request.params.id));

      return successResponse({
        response,
        message: "Catálogo deletado com sucesso.",
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
}
