import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateChallengeUseCase } from "./CreateChallengeUseCase";

class CreateChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      content,
      earned_points,
      see_more_url,
      is_completed,
    } = request.body;

    const createChallengeUseCase = container.resolve(CreateChallengeUseCase);

    const challenge = await createChallengeUseCase.execute({
      title,
      description,
      content,
      earned_points,
      see_more_url,
      is_completed,
    });

    return response.status(201).json(challenge);
  }
}

export { CreateChallengeController };
