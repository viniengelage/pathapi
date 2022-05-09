import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    username,
    email,
    password,
    name,
    cellphone,
    birthday,
    free_time,
    genre,
    id,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      username,
      email,
      password,
      name,
      birthday,
      cellphone,
      free_time,
      genre,
    });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
