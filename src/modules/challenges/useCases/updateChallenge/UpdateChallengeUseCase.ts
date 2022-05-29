import { inject, injectable } from "tsyringe";

import { ICreateChallengeDTO } from "@modules/challenges/dtos/ICreateChallengeDTO";
import { Challenge } from "@modules/challenges/infra/typeorm/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateChallengeUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute({
    id,
    title,
    description,
    content,
    earned_points,
    see_more_url,
  }: ICreateChallengeDTO): Promise<Challenge> {
    const challenge = await this.challengesRepository.findById(id);

    if (!challenge) {
      throw new AppError("Desafio não encontrado", 404);
    }

    challenge.title = title;
    challenge.description = description;
    challenge.content = content;
    challenge.earned_points = earned_points;
    challenge.see_more_url = see_more_url;

    const upatedChallenge = await this.challengesRepository.update(challenge);

    return upatedChallenge;
  }
}

export { UpdateChallengeUseCase };
