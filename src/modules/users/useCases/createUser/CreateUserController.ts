import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      username,
      email,
      password,
      birthday,
      cellphone,
      free_time,
      genre,
      name,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      const user = await createUserUseCase.execute({
        username,
        email,
        password,
        birthday,
        cellphone,
        free_time,
        genre,
        name,
      });

      delete user.password;

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}

export { CreateUserController };
