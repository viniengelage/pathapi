import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = uuidV4();

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: dayjs().add(3, "hour").toDate(),
    });

    const variables = {
      name: user.name,
      link: `${process.env.APP_HOST}:${process.env.APP_PORT}/auth/password/reset?token=${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}
export { SendForgotPasswordMailUseCase };
