import { Request, Response } from "express";
import { container } from "tsyringe";

import { CompleteUserChallengeUseCase } from "./CompleteUserChallengeUseCase";

class CompleteUserChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_challenge_id } = request.params;

    const completeUserChallengeUseCase = container.resolve(
      CompleteUserChallengeUseCase
    );

    const completedUserChallenge = await completeUserChallengeUseCase.execute({
      user_challenge_id,
    });

    return response.status(200).json(completedUserChallenge);
  }
}

export { CompleteUserChallengeController };
