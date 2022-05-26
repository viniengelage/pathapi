import { Request, Response } from "express";
import { container } from "tsyringe";
import * as Yup from "yup";

import { ValidationError } from "@shared/errors/ValidationError";
import getValidationErrors from "@utils/validationErrors";

import { CreateActivityUseCase } from "./CreateActivityUseCase";

class CreateActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, activity_category_id } = request.body;
    const icon = request.file.filename;

    const activity = {
      name,
      description,
      activity_category_id,
      icon,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().optional(),
      activity_category_id: Yup.string().required(),
      icon: Yup.string().required(),
    });

    try {
      await schema.validate(activity, { abortEarly: false });
    } catch (error) {
      const errors = getValidationErrors(error);

      throw new ValidationError(errors);
    }

    const createActivityUseCase = container.resolve(CreateActivityUseCase);

    const createdActivity = await createActivityUseCase.execute(activity);

    return response.status(200).json(createdActivity);
  }
}

export { CreateActivityController };
