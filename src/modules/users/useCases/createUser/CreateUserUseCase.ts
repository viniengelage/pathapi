import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    username,
    email,
    password,
    birthday,
    cellphone,
    free_time,
    genre,
    name,
  }: ICreateUserDTO): Promise<User> {
    const encryptedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      username,
      email,
      password: encryptedPassword,
      name,
      birthday,
      cellphone,
      free_time,
      genre,
    });

    return user;
  }
}

export { CreateUserUseCase };
