import { getRepository, Repository } from "typeorm";

import { ICreateUserChallengeDTO } from "@modules/challenges/dtos/ICreateUserChallengeDTO";
import { IUserChallengesRepository } from "@modules/challenges/repositories/IUserChallengesRepository";

import { UserChallenge } from "../entities/UserChallenge";

class UserChallengesRepository implements IUserChallengesRepository {
  private repository: Repository<UserChallenge>;

  constructor() {
    this.repository = getRepository(UserChallenge);
  }

  async create({
    user_id,
    challenge_id,
  }: ICreateUserChallengeDTO): Promise<UserChallenge> {
    const userChallenge = this.repository.create({
      user_id,
      challenge_id,
    });

    await this.repository.save(userChallenge);

    return userChallenge;
  }

  async update({
    id,
    challenge_id,
    is_completed,
    user_id,
  }: ICreateUserChallengeDTO): Promise<UserChallenge> {
    await this.repository.save({
      id,
      user_id,
      challenge_id,
      is_completed,
    });

    const updatedUserChallenge = await this.repository.findOne(id);

    return updatedUserChallenge;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<UserChallenge> {
    const userChallenge = await this.repository.findOne(id);

    return userChallenge;
  }

  async findByUserAndChallengeId(
    user_id: string,
    challenge_id: string
  ): Promise<UserChallenge> {
    const challenge = await this.repository.findOne({
      where: {
        user_id,
        challenge_id,
      },
    });

    return challenge;
  }

  async findIncompletedChallenge(user_id: string): Promise<UserChallenge> {
    const challenge = await this.repository.findOne({
      where: {
        user_id,
        is_completed: false,
      },
    });

    return challenge;
  }

  async listByUserId(user_id: string): Promise<UserChallenge[]> {
    const challenges = this.repository.find({ user_id });

    return challenges;
  }
}

export { UserChallengesRepository };
