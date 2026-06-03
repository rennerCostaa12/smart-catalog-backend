import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";

import { AppError } from "../errors/AppError";
import { HttpStatusCode } from "../http/HttpStatusCode";
import { errorResponse } from "../http/responses";

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response => {
  if (error instanceof AppError) {
    return errorResponse({
      response,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  if (error instanceof ValidationError) {
    return errorResponse({
      response,
      statusCode: HttpStatusCode.BAD_REQUEST,
      message: "Validation failed.",
      errors: error.errors,
    });
  }

  return errorResponse({
    response,
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    message: "Internal server error.",
  });
};
