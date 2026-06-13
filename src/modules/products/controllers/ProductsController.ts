import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";
import { CreateProductService } from "../services/CreateProductService";
import { DeleteProductService } from "../services/DeleteProductService";
import { GetProductService } from "../services/GetProductService";
import { ListProductsByCatalogClientService } from "../services/ListProductsByCatalogClientService";
import { ListProductsService } from "../services/ListProductsService";
import { UpdateProductService } from "../services/UpdateProductService";
import { DEFAULT_INITIAL_PAGE, DEFAULT_PAGINATION_LIMIT } from "../constants";

export class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const product = await new CreateProductService().execute(request.body);

      return successResponse({
        response,
        statusCode: HttpStatusCode.CREATED,
        message: "Produto cadastrado com sucesso.",
        data: product,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async list(_request: Request, response: Response): Promise<Response> {
    try {
      const products = await new ListProductsService().execute();

      return successResponse({
        response,
        message: "Produtos listados com sucesso.",
        data: products,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async listByCatalogClient(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const catalogClientName = String(request?.params?.catalog_client_name);
      const page = Number(request?.query?.page ?? DEFAULT_INITIAL_PAGE);
      const limit = Number(request?.query?.limit ?? DEFAULT_PAGINATION_LIMIT);
      const categoriesId =
        request.query.categoria === undefined
          ? undefined
          : Number(request.query.categoria);

      if (limit > 100) {
        throw new AppError(
          "O parâmetro limite deve ser menor ou igual a 100.",
          HttpStatusCode.BAD_REQUEST,
        );
      }

      const products = await new ListProductsByCatalogClientService().execute({
        catalogClientName,
        categoriesId,
        page,
        limit,
      });

      return successResponse({
        response,
        message: "Produtos listados com sucesso.",
        data: products,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const product = await new GetProductService().execute(
        Number(request.params.id),
      );

      return successResponse({
        response,
        message: "Produto encontrado com sucesso.",
        data: product,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const product = await new UpdateProductService().execute(
        Number(request.params.id),
        request.body,
      );

      return successResponse({
        response,
        message: "Produto atualizado com sucesso.",
        data: product,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const product = await new DeleteProductService().execute(
        Number(request.params.id),
      );

      return successResponse({
        response,
        message: "Produto deletado com sucesso.",
        data: product,
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
