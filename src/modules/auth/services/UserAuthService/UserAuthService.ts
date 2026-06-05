import { LoginUserDTO } from "../../dtos/LoginUserDTO";
import { RegisterUserDTO } from "../../dtos/RegisterUserDTO";
import { User } from "../../../users/models/User";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/http/HttpStatusCode";
import { generateAuthToken } from "../../../../shared/security/auth-token";

import { AuthResponse } from "./types";

export class UserAuthService {
  public async register(data: RegisterUserDTO): Promise<AuthResponse> {
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

    return this.buildAuthResponse(user);
  }

  public async login(data: LoginUserDTO): Promise<AuthResponse> {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      throw new AppError("Credenciais inválidas.", HttpStatusCode.UNAUTHORIZED);
    }

    return this.buildAuthResponse(user);
  }

  private buildAuthResponse(user: User): AuthResponse {
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token: generateAuthToken({ sub: user.id, role: "user" }),
    };
  }
}
