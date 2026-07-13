import { NextFunction, Request, Response } from "express";

export const appendUploadedImageToBody = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  if (request.file) {
    request.body = {
      ...request.body,
      image: request.file,
    };
  }

  next();
};