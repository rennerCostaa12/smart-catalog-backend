import * as yup from "yup";

export const updateUserAddressSchema = yup
  .object({
    label: yup.string().trim().optional(),
    address: yup.string().trim().optional(),
    neighborhood: yup.string().trim().optional(),
    complement: yup.string().trim().nullable().optional(),
    city: yup.string().trim().optional(),
    state: yup.string().trim().optional(),
    number: yup.number().optional(),
    postalCode: yup.string().trim().optional(),
  })
  .test(
    "has-fields",
    "Informe ao menos um campo para atualizar.",
    (value) => Object.keys(value ?? {}).length > 0,
  );
