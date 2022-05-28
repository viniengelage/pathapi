import { inject, injectable } from "tsyringe";

import { ICreateChallengeDTO } from "@modules/challenges/dtos/ICreateChallengeDTO";
import { Challenge } from "@modules/challenges/infra/typeorm/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";

@injectable()
class CreateChallengeUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute({
    title,
    description,
    content,
    earned_points,
    see_more_url,
    is_completed,
  }: ICreateChallengeDTO): Promise<Challenge> {
    const challenge = await this.challengesRepository.create({
      title,
      content,
      description,
      earned_points,
      see_more_url,
      is_completed,
    });

    return challenge;
  }
}

export { CreateChallengeUseCase };
