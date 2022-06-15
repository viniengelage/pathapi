import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES,
    });

    const refresh_token = sign({ email }, process.env.JWT_REFRESH_SECRET, {
      subject: user.id,
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: this.dateProvider.addDays(30),
    });

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
