import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateChallengeUseCase } from "./UpdateChallengeUseCase";

class UpdateChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description, content, earned_points, see_more_url, level } =
      request.body;

    const updateChallengeUseCase = container.resolve(UpdateChallengeUseCase);

    const updatedChallenge = await updateChallengeUseCase.execute({
      id,
      title,
      description,
      content,
      earned_points,
      see_more_url,
      level,
    });

    return response.status(200).json(updatedChallenge);
  }
}

export { UpdateChallengeController };
