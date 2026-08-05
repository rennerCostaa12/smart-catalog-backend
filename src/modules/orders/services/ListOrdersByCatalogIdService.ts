import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";
import { CatalogClient } from "../../catalog-clients/models/CatalogClient";
import { CategoryProduct } from "../../categories-products/models/CategoryProduct";
import { MethodPayment } from "../../method-payments/models/MethodPayment";
import { OrderItem } from "../../order-items/models/OrderItem";
import { Payment } from "../../payments/models/Payment";
import { Product } from "../../products/models/Product";
import { StatusOrder } from "../../status-orders/models/StatusOrder";
import { StatusPayment } from "../../status-payments/models/StatusPayment";
import { UserAddress } from "../../user-address/models/UserAddress";
import { User } from "../../users/models/User";
import { Order } from "../models/Order";
import {
  ListOrdersByCatalogIdParams,
  PaginatedOrdersByCatalogResponse,
  StatusOrderNameEnum,
} from "./types";

export class ListOrdersByCatalogIdService {
  public async execute({
    catalogClientId,
    page,
    limit,
    statusOrderId,
  }: ListOrdersByCatalogIdParams): Promise<PaginatedOrdersByCatalogResponse> {
    if (limit > 100) {
      throw new AppError(
        "O parâmetro limite deve ser menor ou igual a 100.",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const where = {
      catalogClientId,
      ...(statusOrderId ? { statusOrderId } : {}),
    };

    const { rows, count } = await Order.findAndCountAll({
      where,
      distinct: true,
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
        {
          model: Payment,
          as: "payment",
          attributes: ["amount", "paidAt"],
          include: [
            {
              model: StatusPayment,
              as: "statusPayment",
              attributes: ["name"],
            },
          ],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "phone"],
        },
        {
          model: UserAddress,
          as: "userAddress",
          attributes: [
            "label",
            "address",
            "neighborhood",
            "complement",
            "city",
            "state",
            "number",
            "postalCode",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset: (page - 1) * limit,
    });

    const orders = rows.map((ordersData) => {
      const items = ordersData.items?.map((item) => {
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
      });

      return {
        id: ordersData?.id,
        userId: ordersData?.userId,
        catalogClientId: ordersData?.catalogClientId,
        total: Number(ordersData?.total),
        items: items,
        statusOrderId: ordersData?.statusOrderId,
        methodPaymentId: ordersData?.methodPaymentId,
        paymentId: ordersData?.paymentId ?? null,
        deliveryMethod: ordersData?.deliveryMethod,
        userAddress: ordersData.userAddress
          ? {
              label: ordersData.userAddress.label,
              address: ordersData.userAddress.address,
              neighborhood: ordersData.userAddress.neighborhood,
              complement: ordersData.userAddress.complement,
              city: ordersData.userAddress.city,
              state: ordersData.userAddress.state,
              number: ordersData.userAddress.number,
              postalCode: ordersData.userAddress.postalCode,
            }
          : null,
        methodPayment: ordersData.methodPayment
          ? {
              name: ordersData.methodPayment.name,
              description: ordersData.methodPayment.description,
            }
          : null,
        payment: ordersData.payment
          ? {
              id: ordersData.payment.id,
              asaasPaymentId: ordersData.payment.asaasPaymentId ?? null,
              amount: Number(ordersData.payment.amount),
              paidAt: ordersData.payment.paidAt ?? null,
              paymentReversalDate:
                ordersData.payment.paymentReversalDate ?? null,
              statusPayment: ordersData.payment.statusPayment
                ? {
                    name: ordersData.payment.statusPayment.name,
                  }
                : null,
            }
          : null,
        statusOrder: {
          name: ordersData.statusOrder?.name as StatusOrderNameEnum,
        },
        user: {
          id: ordersData.user?.id,
          name: ordersData.user?.name,
          email: ordersData.user?.email,
          phone: ordersData.user?.phone,
        },
        createdAt: ordersData?.createdAt,
      };
    });

    return {
      orders: orders,
      pagination: {
        page,
        limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }
}
