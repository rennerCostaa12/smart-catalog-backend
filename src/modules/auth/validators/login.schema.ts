import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("O campo email é obrigatório.")
    .email("O campo email deve conter um e-mail válido."),
  password: yup
    .string()
    .required("O campo password é obrigatório.")
    .min(6, "O campo password deve ter no mínimo 6 caracteres."),
});
