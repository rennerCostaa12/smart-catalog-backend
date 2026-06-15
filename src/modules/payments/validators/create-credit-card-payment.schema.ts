import * as yup from "yup";

const creditCardSchema = yup
  .object({
    holderName: yup.string().required("O campo holderName é obrigatório."),
    number: yup.string().required("O campo number é obrigatório."),
    expiryMonth: yup
      .string()
      .required("O campo expiryMonth é obrigatório.")
      .length(2, "O campo expiryMonth deve ter exatamente 2 caracteres."),
    expiryYear: yup
      .string()
      .required("O campo expiryYear é obrigatório.")
      .min(2, "O campo expiryYear deve ter no mínimo 2 caracteres.")
      .max(4, "O campo expiryYear deve ter no máximo 4 caracteres."),
    ccv: yup
      .string()
      .required("O campo ccv é obrigatório.")
      .min(3, "O campo ccv deve ter no mínimo 3 caracteres.")
      .max(4, "O campo ccv deve ter no máximo 4 caracteres."),
  })
  .default(undefined);

const creditCardHolderInfoSchema = yup
  .object({
    name: yup.string().required("O campo name é obrigatório."),
    email: yup
      .string()
      .required("O campo email é obrigatório.")
      .email("O campo email deve conter um e-mail válido."),
    cpfCnpj: yup.string().required("O campo cpfCnpj é obrigatório."),
    postalCode: yup.string().required("O campo postalCode é obrigatório."),
    addressNumber: yup
      .string()
      .required("O campo addressNumber é obrigatório."),
    addressComplement: yup.string(),
    phone: yup.string().required("O campo phone é obrigatório."),
    mobilePhone: yup.string(),
  })
  .default(undefined);

const customerDataSchema = yup
  .object({
    name: yup.string().required("O campo customerData.name é obrigatório."),
    cpfCnpj: yup
      .string()
      .required("O campo customerData.cpfCnpj é obrigatório."),
  })
  .default(undefined);

export const createCreditCardPaymentSchema = yup
  .object({
    customer: yup.string(),
    userId: yup
      .number()
      .integer("O campo userId deve ser um número inteiro.")
      .positive("O campo userId deve ser maior que zero.")
      .required("O campo userId é obrigatório."),
    catalogClientId: yup
      .number()
      .integer("O campo catalogClientId deve ser um número inteiro.")
      .positive("O campo catalogClientId deve ser maior que zero.")
      .required("O campo catalogClientId é obrigatório."),
    value: yup
      .number()
      .required("O campo value é obrigatório.")
      .positive("O campo value deve ser um número positivo."),
    dueDate: yup.string().required("O campo dueDate é obrigatório."),
    description: yup
      .string()
      .max(500, "O campo description deve ter no máximo 500 caracteres."),
    externalReference: yup
      .string()
      .max(255, "O campo externalReference deve ter no máximo 255 caracteres."),
    customerData: customerDataSchema,
    creditCard: creditCardSchema,
    creditCardHolderInfo: creditCardHolderInfoSchema,
    creditCardToken: yup.string(),
    authorizeOnly: yup.boolean(),
    remoteIp: yup.string().required("O campo remoteIp é obrigatório."),
  })
  .test(
    "credit-card-data-or-token",
    "Envie creditCardToken ou ambos, creditCard e creditCardHolderInfo.",
    (value) => {
      if (!value) {
        return false;
      }

      return Boolean(
        value.creditCardToken ||
        (value.creditCard && value.creditCardHolderInfo),
      );
    },
  )
  .test(
    "customer-or-customer-data",
    "Envie customer, customerData ou creditCardHolderInfo para identificar o cliente.",
    (value) =>
      Boolean(
        value?.customer || value?.customerData || value?.creditCardHolderInfo,
      ),
  );
