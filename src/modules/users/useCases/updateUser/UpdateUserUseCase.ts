import { inject, injectable } from "tsyringe";

import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    name,
    birthday,
    cellphone,
    free_time,
    genre,
  }: IUpdateUserDTO) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const updatedUser = await this.usersRepository.update({
      id,
      name: name || user.name,
      birthday: birthday || user.birthday,
      cellphone: cellphone || user.cellphone,
      free_time: free_time || user.free_time,
      genre: genre || user.genre,
    });

    return updatedUser;
  }
}

export { UpdateUserUseCase };
