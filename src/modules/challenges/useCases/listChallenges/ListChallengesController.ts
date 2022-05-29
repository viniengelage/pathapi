import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListChallengesUseCase } from "./ListChallengesUseCase";

class ListChallengesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listChallengesUseCase = container.resolve(ListChallengesUseCase);

    const challenges = await listChallengesUseCase.execute();

    return response.status(200).json(challenges);
  }
}

export { ListChallengesController };
