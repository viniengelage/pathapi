import { getRepository, Repository } from "typeorm";

import { ICreateChallengeDTO } from "@modules/challenges/dtos/ICreateChallengeDTO";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";

import { Challenge } from "../entities/Challenge";

class ChallengesRepository implements IChallengesRepository {
  private repository: Repository<Challenge>;

  constructor() {
    this.repository = getRepository(Challenge);
  }

  async create({
    title,
    description,
    content,
    earned_points,
    see_more_url,
  }: ICreateChallengeDTO): Promise<Challenge> {
    const challenge = this.repository.create({
      title,
      description,
      content,
      earned_points,
      see_more_url,
    });

    await this.repository.save(challenge);

    return challenge;
  }
}

export { ChallengesRepository };
