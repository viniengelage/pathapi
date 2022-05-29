import { inject, injectable } from "tsyringe";

import { Challenge } from "@modules/challenges/infra/typeorm/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowChallengeUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute(id: string): Promise<Challenge> {
    const challenge = await this.challengesRepository.findById(id);

    if (!challenge) {
      throw new AppError("Desafio não encontrado", 404);
    }

    return challenge;
  }
}

export { ShowChallengeUseCase };
