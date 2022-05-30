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

  async update({
    id,
    title,
    description,
    content,
    earned_points,
    see_more_url,
    icon,
  }: ICreateChallengeDTO): Promise<Challenge> {
    await this.repository.save({
      id,
      title,
      description,
      content,
      earned_points,
      see_more_url,
      icon,
    });

    const challenge = await this.repository.findOne(id);

    return challenge;
  }

  async findAll(): Promise<Challenge[]> {
    const challenges = this.repository.find();

    return challenges;
  }

  async findById(id: string): Promise<Challenge> {
    const challenge = await this.repository.findOne(id);

    return challenge;
  }
}

export { ChallengesRepository };
