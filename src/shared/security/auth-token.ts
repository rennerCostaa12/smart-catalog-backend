import { createHmac, timingSafeEqual } from "crypto";

import { env } from "../../config/env";
import { Response } from "express";
import { TOKEN_TTL_IN_MILLISECONDS, TOKEN_TTL_IN_SECONDS } from "./constants";
import { ROLE_USERS_ENUM } from "../../types/roles";

export type AuthTokenPayload = {
  sub: number;
  role: ROLE_USERS_ENUM;
  exp: number;
};

const encodeBase64Url = (value: object): string => {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
};

const sign = (data: string): string => {
  return createHmac("sha256", env.auth.secret).update(data).digest("base64url");
};

export const generateAuthToken = (
  payload: Omit<AuthTokenPayload, "exp">,
  response: Response,
): string => {
  const header = encodeBase64Url({ alg: "HS256", typ: "JWT" });
  const body = encodeBase64Url({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_IN_SECONDS,
  });
  const signature = sign(`${header}.${body}`);

  const token = `${header}.${body}.${signature}`;

  response.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_TTL_IN_MILLISECONDS,
    path: "/",
  });

  return token;
};

export const verifyAuthToken = (token: string): AuthTokenPayload | null => {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const [header, body, signature] = parts;

    if (!header || !body || !signature) {
      return null;
    }

    const expectedSignature = sign(`${header}.${body}`);
    const receivedSignature = Buffer.from(signature);
    const expectedSignatureBuffer = Buffer.from(expectedSignature);

    if (
      receivedSignature.length !== expectedSignatureBuffer.length ||
      !timingSafeEqual(receivedSignature, expectedSignatureBuffer)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as Partial<AuthTokenPayload>;

    if (
      !Number.isInteger(payload.sub) ||
      payload.sub! <= 0 ||
      (payload.role !== ROLE_USERS_ENUM.USER &&
        payload.role !== ROLE_USERS_ENUM.ADMIN) ||
      !Number.isInteger(payload.exp) ||
      payload.exp! <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return payload as AuthTokenPayload;
  } catch {
    return null;
  }
};
