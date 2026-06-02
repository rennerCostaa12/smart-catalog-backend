import { Response } from "express";

import { HttpStatusCode } from "./HttpStatusCode";

type SuccessResponseOptions<T> = {
  response: Response;
  statusCode?: HttpStatusCode;
  message?: string;
  data?: T;
};

type ErrorResponseOptions = {
  response: Response;
  statusCode: number;
  message: string;
  errors?: string[];
};

export const successResponse = <T>({
  response,
  statusCode = HttpStatusCode.OK,
  message = "Success.",
  data,
}: SuccessResponseOptions<T>): Response => {
  return response.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
  });
};

export const errorResponse = ({
  response,
  statusCode,
  message,
  errors,
}: ErrorResponseOptions): Response => {
  return response.status(statusCode).json({
    success: false,
    message,
    errors: errors ?? [],
  });
};
