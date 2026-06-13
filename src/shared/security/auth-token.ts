import { createHmac, timingSafeEqual } from "crypto";

import { env } from "../../config/env";

export type AuthTokenPayload = {
  sub: number;
  role: "user" | "admin";
  exp: number;
};

const TOKEN_TTL_IN_SECONDS = 60 * 60 * 24;

const encodeBase64Url = (value: object): string => {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
};

const sign = (data: string): string => {
  return createHmac("sha256", env.auth.secret)
    .update(data)
    .digest("base64url");
};

export const generateAuthToken = (
  payload: Omit<AuthTokenPayload, "exp">,
): string => {
  const header = encodeBase64Url({ alg: "HS256", typ: "JWT" });
  const body = encodeBase64Url({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_IN_SECONDS,
  });
  const signature = sign(`${header}.${body}`);

  return `${header}.${body}.${signature}`;
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
      (payload.role !== "user" && payload.role !== "admin") ||
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
