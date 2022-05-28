import { inject, injectable } from "tsyringe";

import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowChallengeIconUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute(challenge_id: string): Promise<string> {
    const challenge = await this.challengesRepository.findById(challenge_id);

    if (!challenge) {
      throw new AppError("Desafio não encontrado", 404);
    }

    return challenge.icon;
  }
}

export { ShowChallengeIconUseCase };
