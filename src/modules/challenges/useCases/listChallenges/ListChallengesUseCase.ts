import { inject, injectable } from "tsyringe";

import { Challenge } from "@modules/challenges/infra/typeorm/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";

@injectable()
class ListChallengesUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute(): Promise<Challenge[]> {
    const challenges = await this.challengesRepository.findAll();

    return challenges;
  }
}

export { ListChallengesUseCase };
