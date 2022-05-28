import { inject, injectable } from "tsyringe";

import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";

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

  async execute({ challenge_id, icon_file }: IRequest) {
    const challenge = await this.challengesRepository.findById(challenge_id);

    if (!challenge) {
      throw new AppError("Desafio não encontrado", 404);
    }

    if (challenge.icon) {
      await deleteFile(`./tmp/icons/${challenge.icon}`);
    }

    challenge.icon = icon_file;

    const updatedChallenge = this.challengesRepository.update(challenge);

    return updatedChallenge;
  }
}

export { UpdateChallengeIconUseCase };
