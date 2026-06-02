import { env } from "../../../config/env";
import { AppError } from "../../errors/AppError";
import { HttpStatusCode } from "../../http/HttpStatusCode";
import { AsaasErrorResponse } from "./types";

export class AsaasHttpClient {
  private readonly baseUrl = env.asaas.baseUrl.replace(/\/$/, "");

  public async get<TResponse>(path: string): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        access_token: env.asaas.apiKey,
      },
    });

    const data = await this.parseResponse<AsaasErrorResponse | TResponse>(
      response,
    );

    if (!response.ok) {
      const message = this.getErrorMessage(data as AsaasErrorResponse);

      throw new AppError(message, this.mapStatusCode(response.status));
    }

    return data as TResponse;
  }

  public async post<TResponse, TBody extends object>(
    path: string,
    body: TBody,
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        access_token: env.asaas.apiKey,
      },
      body: JSON.stringify(body),
    });

    const data = await this.parseResponse<AsaasErrorResponse | TResponse>(
      response,
    );

    if (!response.ok) {
      const message = this.getErrorMessage(data as AsaasErrorResponse);

      throw new AppError(message, this.mapStatusCode(response.status));
    }

    return data as TResponse;
  }

  private async parseResponse<T>(response: Response): Promise<T | null> {
    const text = await response.text();

    if (!text) {
      return null;
    }

    return JSON.parse(text);
  }

  private getErrorMessage(data: AsaasErrorResponse | null): string {
    const firstError = data?.errors?.[0]?.description;

    return firstError ?? "Falha na comunicação do Asaas.";
  }

  private mapStatusCode(statusCode: number): HttpStatusCode {
    if (statusCode === HttpStatusCode.UNAUTHORIZED) {
      return HttpStatusCode.UNAUTHORIZED;
    }

    if (statusCode === HttpStatusCode.BAD_REQUEST) {
      return HttpStatusCode.BAD_REQUEST;
    }

    return HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
