import { inject, injectable } from "tsyringe";

import { UserChallenge } from "@modules/challenges/infra/typeorm/entities/UserChallenge";
import { IUserChallengesRepository } from "@modules/challenges/repositories/IUserChallengesRepository";

@injectable()
class ListChallengesByUserUseCase {
  constructor(
    @inject("UserChallengesRepository")
    private userChallengesRepository: IUserChallengesRepository
  ) {}

  async execute(user_id: string): Promise<UserChallenge[]> {
    const challenges = this.userChallengesRepository.listByUserId(user_id);

    return challenges;
  }
}

export { ListChallengesByUserUseCase };
