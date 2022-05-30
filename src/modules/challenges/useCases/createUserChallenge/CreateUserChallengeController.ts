import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserChallengeUseCase } from "./CreateUserChallengeUseCase";

class CreateUserChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.params;
    const { challenge_id } = request.body;

    const createUserChallengeUseCase = container.resolve(
      CreateUserChallengeUseCase
    );

    const userChallenge = await createUserChallengeUseCase.execute({
      user_id,
      challenge_id,
    });

    return response.status(201).json(userChallenge);
  }
}

export { CreateUserChallengeController };
