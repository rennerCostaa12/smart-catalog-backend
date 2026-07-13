import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";
import { ListCategoriesProductsService } from "../services/ListCategoriesProductsService";

export class CategoriesProductsController {
  public async list(_request: Request, response: Response): Promise<Response> {
    try {
      const categoriesProducts =
        await new ListCategoriesProductsService().execute();

      return successResponse({
        response,
        message: "Categorias de produtos listadas com sucesso.",
        data: categoriesProducts,
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
