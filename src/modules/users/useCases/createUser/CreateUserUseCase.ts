import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IValidationProvider } from "@shared/container/providers/IValidationProvider";
import { ValidationError } from "@shared/errors/ValidationError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ValidationProvider")
    private validationProvider: IValidationProvider
  ) {}

  async execute({
    email,
    password,
    birthday,
    cellphone,
    free_time,
    genre,
    name,
  }: ICreateUserDTO): Promise<User> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new ValidationError({ email: "Esse email já foi usado" });
    }

    if (cellphone) {
      const isValidCellphone = this.validationProvider.validatePhone(cellphone);

      if (!isValidCellphone)
        throw new ValidationError({ cellphone: "Telefone inválido" });
    }

    const encryptedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
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
