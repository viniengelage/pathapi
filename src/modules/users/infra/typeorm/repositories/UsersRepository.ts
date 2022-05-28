import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
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

  async update({
    id,
    name,
    birthday,
    cellphone,
    genre,
    free_time,
    avatar,
    activities,
  }: IUpdateUserDTO): Promise<User> {
    await this.repository.save({
      id,
      name,
      birthday,
      cellphone,
      genre,
      free_time,
      avatar,
      activities,
    });

    const updatedUser = await this.repository.findOne(id);

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<User> {
    const user = this.repository.findOne(id, {
      relations: ["activities"],
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({ email });

    return user;
  }

  async findAll(): Promise<User[]> {
    const all = await this.repository.find();

    return all;
  }
}

export { UsersRepository };
