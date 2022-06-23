import { compare, hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { ValidationError } from "@shared/errors/ValidationError";

interface IRequest {
  user_id: string;
  old_password: string;
  new_password: string;
}

@injectable()
class UpdateUserPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execue({
    user_id,
    old_password,
    new_password,
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    const isSamePasword = await compare(old_password, user.password);

    if (!isSamePasword) {
      throw new ValidationError({ old_password: "Senha incorreta" });
    }

    const encryptedNewPasswordPassword = await hash(new_password, 8);

    user.password = encryptedNewPasswordPassword;

    await this.usersRepository.update(user);
  }
}

export { UpdateUserPasswordUseCase };
