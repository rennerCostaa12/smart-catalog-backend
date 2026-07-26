import { Response } from "express";

export class AuthService {
  public async logout(response: Response) {
    const accessToken = response.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return accessToken;
  }
}
