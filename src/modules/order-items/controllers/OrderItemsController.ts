import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { errorResponse, successResponse } from "../../../shared/http/responses";
import { CreateOrderItemService } from "../services/CreateOrderItemService";
import { DeleteOrderItemService } from "../services/DeleteOrderItemService";
import { GetOrderItemService } from "../services/GetOrderItemService";
import { ListOrderItemsService } from "../services/ListOrderItemsService";
import { UpdateOrderItemService } from "../services/UpdateOrderItemService";

export class OrderItemsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const orderId = this.getOrderIdFromParams(request);
      const orderItem = await new CreateOrderItemService().execute(
        orderId,
        request.body,
      );

      return successResponse({
        response,
        statusCode: HttpStatusCode.CREATED,
        message: "Item do pedido cadastrado com sucesso.",
        data: orderItem,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const orderId = this.getOrderIdFromParams(request);
      const orderItems = await new ListOrderItemsService().execute(orderId);

      return successResponse({
        response,
        message: "Itens do pedido listados com sucesso.",
        data: orderItems,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const orderId = this.getOrderIdFromParams(request);
      const orderItemId = String(request?.params?.id);

      const orderItem = await new GetOrderItemService().execute(
        orderItemId,
        orderId,
      );

      return successResponse({
        response,
        message: "Item do pedido encontrado com sucesso.",
        data: orderItem,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const orderId = this.getOrderIdFromParams(request);
      const orderItemId = String(request?.params?.id);

      const orderItem = await new UpdateOrderItemService().execute(
        orderItemId,
        orderId,
        request.body,
      );

      return successResponse({
        response,
        message: "Item do pedido atualizado com sucesso.",
        data: orderItem,
      });
    } catch (error) {
      return this.handleError(error, response);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const orderId = this.getOrderIdFromParams(request);
      const orderItemId = String(request?.params?.id);

      await new DeleteOrderItemService().execute(orderItemId, orderId);

      return successResponse({
        response,
        message: "Item do pedido deletado com sucesso.",
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

  private getOrderIdFromParams(request: Request): string {
    const orderId = request?.params?.orderId;

    if (!orderId || Array.isArray(orderId)) {
      throw new AppError(
        "O parâmetro orderId é obrigatório.",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    return orderId;
  }
}
