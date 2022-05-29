import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowChallengeUseCase } from "./ShowChallengeUseCase";

class ShowChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showChallengeUseCase = container.resolve(ShowChallengeUseCase);

    const challenge = await showChallengeUseCase.execute(id);

    return response.status(200).json(challenge);
  }
}

export { ShowChallengeController };
