import { Request, Response } from "express";
import { container } from "tsyringe";
import * as Yup from "yup";

import { ValidationError } from "@shared/errors/ValidationError";
import getValidationErrors from "@utils/validationErrors";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, birthday, cellphone, genre, free_time } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const updatedUser = {
      id,
      name,
      birthday,
      cellphone,
      genre,
      free_time,
    };

    const schema = Yup.object().shape({
      name: Yup.string().optional(),
      birthday: Yup.date().optional().typeError("Digite uma data válida"),
      free_time: Yup.string().optional(),
      genre: Yup.string().oneOf(["male", "female", "other"]).optional(),
    });

    try {
      await schema.validate(updatedUser, { abortEarly: false });
    } catch (error) {
      const errors = getValidationErrors(error);

      throw new ValidationError(errors);
    }

    const updatedUserCreated = await updateUserUseCase.execute(updatedUser);

    delete updatedUserCreated.password;

    return response.status(200).json(updatedUserCreated);
  }
}

export { UpdateUserController };
