import { inject, injectable } from "tsyringe";

import { IUserChallengesRepository } from "@modules/challenges/repositories/IUserChallengesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteUserChallengeUseCase {
  constructor(
    @inject("UserChallengesRepository")
    private userChallengesRepository: IUserChallengesRepository
  ) {}

  async execute(id: string) {
    const userChallenge = await this.userChallengesRepository.findById(id);

    if (!userChallenge) {
      throw new AppError("Desafio não encontrado", 404);
    }

    await this.userChallengesRepository.delete(id);
  }
}

export { DeleteUserChallengeUseCase };
