import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListChallengesByUserUseCase } from "./ListChallengesByUserUseCase";

class ListChallengesByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listChallengesByUserUseCase = container.resolve(
      ListChallengesByUserUseCase
    );

    const challenges = await listChallengesByUserUseCase.execute(id);

    return response.status(200).json(challenges);
  }
}

export { ListChallengesByUserController };
