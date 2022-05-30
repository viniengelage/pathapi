import { inject, injectable } from "tsyringe";

import { UserChallenge } from "@modules/challenges/infra/typeorm/entities/UserChallenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { IUserChallengesRepository } from "@modules/challenges/repositories/IUserChallengesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  challenge_id: string;
}

@injectable()
class CreateUserChallengeUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserChallengesRepository")
    private userChallengesRepository: IUserChallengesRepository
  ) {}

  async execute({ user_id, challenge_id }: IRequest): Promise<UserChallenge> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const challenge = await this.challengesRepository.findById(challenge_id);

    if (!challenge) {
      throw new AppError("Desafio não encontrado");
    }

    const userChallengeExists =
      await this.userChallengesRepository.findByUserAndChallengeId(
        user_id,
        challenge_id
      );

    if (userChallengeExists) {
      throw new AppError("Desafio já anexado ao usuário");
    }

    const incompletedChallenge =
      await this.userChallengesRepository.findIncompletedChallenge(user_id);

    if (incompletedChallenge) {
      throw new AppError("Este usuário ainda não completou o desafio anterior");
    }

    const userChallenge = await this.userChallengesRepository.create({
      user_id,
      challenge_id,
    });

    return userChallenge;
  }
}

export { CreateUserChallengeUseCase };
