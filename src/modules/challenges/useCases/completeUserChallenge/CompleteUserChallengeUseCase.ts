import { inject, injectable } from "tsyringe";

import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { IUserChallengesRepository } from "@modules/challenges/repositories/IUserChallengesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_challenge_id: string;
}

@injectable()
class CompleteUserChallengeUseCase {
  constructor(
    @inject("UserChallengesRepository")
    private userChallengeRepository: IUserChallengesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute({ user_challenge_id }: IRequest) {
    const userChallenge = await this.userChallengeRepository.findById(
      user_challenge_id
    );

    if (!userChallenge) {
      throw new AppError("Desafio não encontrado", 404);
    }

    if (userChallenge.is_completed) {
      throw new AppError("Desafio já completado");
    }

    const user = await this.usersRepository.findById(userChallenge.user_id);

    const challenge = await this.challengesRepository.findById(
      userChallenge.challenge_id
    );

    user.points += challenge.earned_points;
    userChallenge.is_completed = true;

    await this.userChallengeRepository.update(userChallenge);
    await this.usersRepository.update(user);

    return userChallenge;
  }
}

export { CompleteUserChallengeUseCase };
