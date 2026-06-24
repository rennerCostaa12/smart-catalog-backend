import { CatalogClient } from "../../catalog-clients/models/CatalogClient";
import { CategoryProduct } from "../../categories-products/models/CategoryProduct";
import { MethodPayment } from "../../method-payments/models/MethodPayment";
import { OrderItem } from "../../order-items/models/OrderItem";
import { Product } from "../../products/models/Product";
import { StatusOrder } from "../../status-orders/models/StatusOrder";
import { Order } from "../models/Order";
import { OrderResponse, StatusOrderNameEnum } from "./types";

export class ListOrdersService {
  public async execute(userId: number): Promise<OrderResponse[]> {
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: "items",
          attributes: ["quantity", "unitPrice", "subtotal"],
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["name", "description", "value", "imageUrl"],
              include: [
                {
                  model: CatalogClient,
                  as: "catalogClient",
                  attributes: ["name", "description"],
                },
                {
                  model: CategoryProduct,
                  as: "category",
                  attributes: ["name", "description"],
                },
              ],
            },
          ],
        },
        {
          model: StatusOrder,
          as: "statusOrder",
          attributes: ["name"],
        },
        {
          model: MethodPayment,
          as: "methodPayment",
          attributes: ["name", "description"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return orders.map((ordersData) => {
      return {
        id: ordersData?.id,
        userId: ordersData?.userId,
        catalogClientId: ordersData?.catalogClientId,
        total: Number(ordersData?.total),
        items: ordersData.items?.map((item) => {
          const product = item.product!;

          return {
            quantity: item.quantity,
            unitPrice: Number(item.unitPrice),
            subtotal: Number(item.subtotal),
            product: {
              name: product.name,
              description: product.description,
              value: Number(product.value),
              imageUrl: product.imageUrl,
              catalogClient: {
                name: product.catalogClient!.name,
                description: product.catalogClient!.description,
              },
              category: {
                name: product.category!.name,
                description: product.category!.description,
              },
            },
          };
        }),
        statusOrderId: ordersData?.statusOrderId,
        methodPaymentId: ordersData?.methodPaymentId,
        deliveryMethod: ordersData?.deliveryMethod,
        methodPayment: ordersData.methodPayment
          ? {
              name: ordersData.methodPayment.name,
              description: ordersData.methodPayment.description,
            }
          : null,
        statusOrder: {
          name: ordersData.statusOrder?.name as StatusOrderNameEnum,
        },
        createdAt: ordersData?.createdAt,
        updatedAt: ordersData?.updatedAt,
      };
    });
  }
}
