import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(token: string) {
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

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date: dayjs().add(30, "days").toDate(),
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
