import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

@injectable()
class ShowUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<string> {
    const user = await this.usersRepository.findById(user_id);

    return user.avatar;
  }
}

export { ShowUserAvatarUseCase };
