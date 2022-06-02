import { inject, injectable } from "tsyringe";

import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteChallengeUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.challengesRepository.findById(id);

    if (!user) {
      throw new AppError("Desafio não encontrado", 404);
    }

    await this.challengesRepository.delete(id);
  }
}

export { DeleteChallengeUseCase };
