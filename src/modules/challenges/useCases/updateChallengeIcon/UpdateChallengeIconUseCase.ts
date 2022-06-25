import { v2 as cloudinary } from "cloudinary";
import { inject, injectable } from "tsyringe";

import { Challenge } from "@modules/challenges/infra/typeorm/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  challenge_id: string;
  icon_file: string;
}

@injectable()
class UpdateChallengeIconUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute({ challenge_id, icon_file }: IRequest): Promise<Challenge> {
    const challenge = await this.challengesRepository.findById(challenge_id);

    if (!challenge) {
      throw new AppError("Desafio não encontrado", 404);
    }

    if (challenge.icon) {
      await cloudinary.uploader.destroy(challenge.icon);
    }

    challenge.icon = icon_file;

    const updatedChallenge = await this.challengesRepository.update(challenge);

    return updatedChallenge;
  }
}

export { UpdateChallengeIconUseCase };
