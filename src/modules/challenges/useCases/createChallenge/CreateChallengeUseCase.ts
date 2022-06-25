import { inject, injectable } from "tsyringe";

import { ICreateChallengeDTO } from "@modules/challenges/dtos/ICreateChallengeDTO";
import { Challenge } from "@modules/challenges/infra/typeorm/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { AppError } from "@shared/errors/AppError";
import { ValidationError } from "@shared/errors/ValidationError";

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
    level,
    icon,
  }: ICreateChallengeDTO): Promise<Challenge> {
    const levelExists = await this.challengesRepository.findByLevel(level);

    if (levelExists) {
      throw new ValidationError({ level: "Level já criado" });
    }

    const challenges = await this.challengesRepository.findAll("DESC");

    if (challenges.length > 0) {
      const isNextLevel = challenges[0].level === level - 1;

      if (!isNextLevel) {
        throw new ValidationError({
          level: `Nível incorreto, o pŕoximo nível é ${
            challenges[0].level + 1
          }`,
        });
      }
    } else if (level !== 1) {
      throw new ValidationError({
        level: `O primeiro nível deve ser o 1`,
      });
    }

    const challenge = await this.challengesRepository.create({
      title,
      content,
      description,
      earned_points,
      see_more_url,
      level,
      icon,
    });

    console.log("Hello");

    return challenge;
  }
}

export { CreateChallengeUseCase };
