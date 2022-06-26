import { Request, Response } from "express";
import { container } from "tsyringe";
import * as Yup from "yup";

import { ValidationError } from "@shared/errors/ValidationError";
import getValidationErrors from "@utils/validationErrors";

import { UpdateUserPasswordUseCase } from "./UpdateUserPasswordUseCase";

class UpdateUserPasswordController {
  async handle(request: Request, response: Response) {
    const { old_password, new_password, confirm_password } = request.body;
    const { id } = request.user;

    const updateUserPasswordUseCase = container.resolve(
      UpdateUserPasswordUseCase
    );

    try {
      const schema = Yup.object().shape({
        user_id: Yup.string().required(),
        old_password: Yup.string().required(),
        new_password: Yup.string().min(8).required(),
        confirm_password: Yup.string().oneOf(
          [Yup.ref("new_password"), null],
          "Senhas devem coincidir"
        ),
      });

      await schema.validate(
        { user_id: id, old_password, new_password, confirm_password },
        { abortEarly: false }
      );

      await updateUserPasswordUseCase.execue({
        user_id: id,
        old_password,
        new_password,
      });

      return response.status(200).send();
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(422).json(error.errors);
      }

      const errors = getValidationErrors(error);

      throw new ValidationError(errors);
    }
  }
}

export { UpdateUserPasswordController };
