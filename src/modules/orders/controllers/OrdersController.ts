import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";
import { CreateOrderService } from "../services/CreateOrderService";
import { DeleteOrderService } from "../services/DeleteOrderService";
import { GetOrderService } from "../services/GetOrderService";
import { ListOrdersService } from "../services/ListOrdersService";
import { UpdateOrderService } from "../services/UpdateOrderService";

export class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const userId = this.getUserIdFromParams(request);
      const order = await new CreateOrderService().execute(
        userId,
        request.body,
      );

      return successResponse({
        response,
        statusCode: HttpStatusCode.CREATED,
        message: "Pedido cadastrado com sucesso.",
        data: order,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const userId = this.getUserIdFromParams(request);
      const orders = await new ListOrdersService().execute(userId);

      return successResponse({
        response,
        message: "Pedidos listados com sucesso.",
        data: orders,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const userId = this.getUserIdFromParams(request);
      const orderId = String(request?.params?.id);

      const order = await new GetOrderService().execute(orderId, userId);

      return successResponse({
        response,
        message: "Pedido encontrado com sucesso.",
        data: order,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const userId = this.getUserIdFromParams(request);
      const orderId = String(request?.params?.id);

      const order = await new UpdateOrderService().execute(
        orderId,
        userId,
        request.body,
      );

      return successResponse({
        response,
        message: "Pedido atualizado com sucesso.",
        data: order,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const userId = this.getUserIdFromParams(request);
      const orderId = String(request?.params?.id);

      await new DeleteOrderService().execute(orderId, userId);

      return successResponse({
        response,
        message: "Pedido deletado com sucesso.",
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

  private getUserIdFromParams(request: Request): number {
    const userId = Number(request?.params?.userId);

    if (!request?.params?.userId || !Number.isInteger(userId) || userId <= 0) {
      throw new AppError(
        "O parâmetro userId é obrigatório.",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    return userId;
  }
}
