import { AsaasPaymentWebhookDTO } from "../webhooks/ConfirmPaymentWebhook/dtos/AsaasPaymentWebhookDTO";

 export  function handleDatePayment(data: Partial<AsaasPaymentWebhookDTO>, newDate: Date) {
    const paidAt =
      data.payment?.paymentDate ??
      data.payment?.confirmedDate ??
      data.payment?.clientPaymentDate ??
      data.dateCreated;

    if (!paidAt) {
      return newDate;
    }

    const dateOnlyMatch = paidAt?.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (dateOnlyMatch) {
      const [, year, month, day] = dateOnlyMatch;
      const paidAtWithCurrentTime = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        newDate.getHours(),
        newDate.getMinutes(),
        newDate.getSeconds(),
        newDate.getMilliseconds(),
      );

      if (!Number.isNaN(paidAtWithCurrentTime.getTime())) {
        return paidAtWithCurrentTime;
      }

      return newDate;
    }

    const parsedPaidAt = new Date(paidAt);

    if (Number.isNaN(parsedPaidAt.getTime())) {
      return newDate;
    }

    return parsedPaidAt;
  }