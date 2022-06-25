import { Request, Response } from "express";
import { container } from "tsyringe";
import * as Yup from "yup";

import { ValidationError } from "@shared/errors/ValidationError";
import getValidationErrors from "@utils/validationErrors";

import { CreateChallengeUseCase } from "./CreateChallengeUseCase";

class CreateChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, content, earned_points, see_more_url, level } =
      request.body;

    const icon = request.file?.filename;

    console.log(level);

    const challenge = {
      title,
      description,
      content,
      earned_points,
      see_more_url,
      level,
      icon,
    };

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      content: Yup.string().required(),
      earned_points: Yup.number().required(),
      see_more_url: Yup.string().optional(),
      level: Yup.number().required(),
      icon: Yup.string().required(),
    });

    try {
      await schema.validate(challenge, { abortEarly: false });

      challenge.level = Number(challenge.level);
      challenge.earned_points = Number(challenge.earned_points);
    } catch (error) {
      const errors = getValidationErrors(error);
      throw new ValidationError(errors);
    }

    const createChallengeUseCase = container.resolve(CreateChallengeUseCase);

    const createdChallenge = await createChallengeUseCase.execute(challenge);

    return response.status(201).json(createdChallenge);
  }
}

export { CreateChallengeController };
