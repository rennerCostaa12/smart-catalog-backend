import * as yup from "yup";

export const loginUserSchema = yup.object({
  email: yup
    .string()
    .required("O campo email é obrigatório.")
    .email("O campo email deve conter um e-mail válido."),
});
