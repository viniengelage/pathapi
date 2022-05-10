import { validate } from "class-validator";
import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { ValidationError } from "@shared/errors/ValidationError";

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

    const errors = await validate(user);

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
