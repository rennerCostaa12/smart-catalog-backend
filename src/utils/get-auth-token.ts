import { Request } from "express";

import { getBearerToken } from "./get-bearer-token";

export const getAuthToken = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }

  return getBearerToken(value) ?? value;
};

export const getRequestAuthToken = (request: Request): string | undefined => {
  const cookieToken = request.cookies?.access_token;

  if (typeof cookieToken === "string") {
    return getAuthToken(cookieToken);
  }
};
