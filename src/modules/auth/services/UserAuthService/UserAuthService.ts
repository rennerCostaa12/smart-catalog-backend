import { LoginUserDTO } from "../../dtos/LoginUserDTO";
import { RegisterUserDTO } from "../../dtos/RegisterUserDTO";
import { User } from "../../../users/models/User";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/http/HttpStatusCode";
import { generateAuthToken } from "../../../../shared/security/auth-token";

import { AuthResponse, UserResponse } from "./types";
import { Response } from "express";
import { ROLE_USERS_ENUM } from "../../../../types/roles";

export class UserAuthService {
  public async register(data: RegisterUserDTO): Promise<UserResponse> {
    const userAlreadyExists = await User.findOne({
      where: { email: data.email },
    });

    if (userAlreadyExists) {
      throw new AppError("Usuário já cadastrado.", HttpStatusCode.CONFLICT);
    }

    const user = await User.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
    });

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    };
  }

  public async login(
    data: LoginUserDTO,
    response: Response,
  ): Promise<AuthResponse> {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      throw new AppError("Credenciais inválidas.", HttpStatusCode.UNAUTHORIZED);
    }

    return this.buildAuthResponse(user, response);
  }

  private buildAuthResponse(user: User, response: Response): AuthResponse {
    const responseAuth = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token: generateAuthToken({ sub: user.id, role: ROLE_USERS_ENUM.USER }, response),
    };

    return responseAuth;
  }
}
