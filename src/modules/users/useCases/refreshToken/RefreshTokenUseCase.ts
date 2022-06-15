import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub: user_id } = verify(
      token,
      process.env.JWT_REFRESH_SECRET
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exists");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, process.env.JWT_REFRESH_SECRET, {
      subject: user_id,
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });

    const expires_date = this.dateProvider.addDays(30);

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    const newToken = sign({}, process.env.JWT_SECRET, {
      subject: user_id,
      expiresIn: process.env.JWT_EXPIRES,
    });

    return {
      token: newToken,
      refresh_token,
    };
  }
}

export { RefreshTokenUseCase };
