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
import { StatusOrderNameEnum } from "./types";

export class GetOrderService {
  public async execute(id: string, userId: number) {
    const order = await Order.findOne({
      where: {
        id,
        userId,
      },
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
          attributes: ["amount", "paidAt", "asaasPaymentId", "paymentReversalDate"],
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
    });

    
    if (!order) {
      throw new AppError("Pedido não encontrado.", HttpStatusCode.NOT_FOUND);
    }

    const items = order.items?.map((item) => {
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
      id: order?.id,
      userId: order?.userId,
      catalogClientId: order?.catalogClientId,
      total: Number(order?.total),
      items: items,
      statusOrderId: order?.statusOrderId,
      methodPaymentId: order?.methodPaymentId,
      paymentId: order?.paymentId ?? null,
      deliveryMethod: order?.deliveryMethod,
      userAddress: order.userAddress
        ? {
            label: order.userAddress.label,
            address: order.userAddress.address,
            neighborhood: order.userAddress.neighborhood,
            complement: order.userAddress.complement,
            city: order.userAddress.city,
            state: order.userAddress.state,
            number: order.userAddress.number,
            postalCode: order.userAddress.postalCode,
          }
        : null,
      methodPayment: order.methodPayment
        ? {
            name: order.methodPayment.name,
            description: order.methodPayment.description,
          }
        : null,
      payment: order.payment
        ? {
            id: order.payment.id,
            asaasPaymentId: order.payment.asaasPaymentId ?? null,
            amount: Number(order.payment.amount),
            paidAt: order.payment.paidAt ?? null,
            paymentReversalDate: order.payment.paymentReversalDate ?? null,
            statusPayment: order.payment.statusPayment
              ? {
                  name: order.payment.statusPayment.name,
                }
              : null,
          }
        : null,
      statusOrder: {
        name: order.statusOrder?.name as StatusOrderNameEnum,
      },
      user: {
        id: order.user?.id,
        name: order.user?.name,
        email: order.user?.email,
        phone: order.user?.phone,
      },
      createdAt: order?.createdAt,
    };
  }
}
