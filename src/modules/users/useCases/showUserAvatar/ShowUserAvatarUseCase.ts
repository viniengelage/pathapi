import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<string> {
    const user = await this.usersRepository.findById(user_id);

    if (!user.avatar) {
      throw new AppError("Avatar não encontrado", 404);
    }

    return user.avatar;
  }
}

export { ShowUserAvatarUseCase };
