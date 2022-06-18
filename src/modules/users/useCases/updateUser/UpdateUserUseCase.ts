import { inject, injectable } from "tsyringe";

import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { INotificationProvider } from "@shared/container/providers/NotificationProvider/INotificationProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ExpoNotificationProvider")
    private notificationProvider: INotificationProvider
  ) {}

  async execute({
    id,
    name,
    birthday,
    cellphone,
    free_time,
    genre,
    push_token,
  }: IUpdateUserDTO) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    user.name = name;
    user.birthday = birthday;
    user.cellphone = cellphone;
    user.free_time = free_time;
    user.genre = genre;
    user.push_token = push_token;

    const updatedUser = await this.usersRepository.update(user);

    return updatedUser;
  }
}

export { UpdateUserUseCase };
