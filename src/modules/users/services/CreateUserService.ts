import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../models/User";
import { AppError } from "../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../shared/http/HttpStatusCode";

type CreateUserResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export class CreateUserService {
  public async execute(data: CreateUserDTO): Promise<CreateUserResponse> {
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
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }
}
