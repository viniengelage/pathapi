import { Request, Response } from "express";
import { container } from "tsyringe";
import * as Yup from "yup";

import { AppError } from "@shared/errors/AppError";
import { ValidationError } from "@shared/errors/ValidationError";
import getValidationErrors from "@utils/validationErrors";

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

    const user = {
      username,
      email,
      password,
      birthday,
      cellphone,
      free_time,
      genre,
      name,
    };

    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(8),
      name: Yup.string().required(),
      birthday: Yup.date().required().typeError("Digite uma data válida"),
      free_time: Yup.string().optional(),
      genre: Yup.string().oneOf(["male", "female", "other"]),
    });

    try {
      await schema.validate(user, { abortEarly: false });
    } catch (error) {
      const errors = getValidationErrors(error);
      throw new ValidationError(errors);
    }

    const createdUser = await createUserUseCase.execute(user);

    delete createdUser.password;

    return response.status(201).json(createdUser);
  }
}

export { CreateUserController };
