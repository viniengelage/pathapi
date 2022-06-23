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
    icon,
    level,
  }: ICreateChallengeDTO): Promise<Challenge> {
    const challenge = this.repository.create({
      title,
      description,
      content,
      earned_points,
      see_more_url,
      icon,
      level,
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

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(order: "ASC" | "DESC" = "ASC"): Promise<Challenge[]> {
    const challenges = this.repository.find({
      order: {
        level: order,
      },
    });

    return challenges;
  }

  async findById(id: string): Promise<Challenge> {
    const challenge = await this.repository.findOne(id);

    return challenge;
  }

  async findByLevel(level: number): Promise<Challenge> {
    const challenge = await this.repository.findOne({
      level,
    });

    return challenge;
  }

  async findNextLevel(previous_level: number): Promise<Challenge> {
    const nextLevel = await this.repository.findOne({
      where: {
        level: previous_level + 1,
      },
    });

    return nextLevel;
  }
}

export { ChallengesRepository };
