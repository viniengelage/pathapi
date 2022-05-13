import { getRepository, Repository } from "typeorm";

import { ICreateActivityDTO } from "@modules/activities/dtos/ICreateActivityDTO";
import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";

import { Activity } from "../entities/Activity";

class ActivitiesRepository implements IActivitiesRepository {
  private repository: Repository<Activity>;

  constructor() {
    this.repository = getRepository(Activity);
  }

  async create({
    name,
    description,
    icon,
    activitiy_category_id,
  }: ICreateActivityDTO): Promise<Activity> {
    const activity = this.repository.create({
      name,
      description,
      activitiy_category_id,
      icon,
    });

    await this.repository.save(activity);

    return activity;
  }

  async findById(id: string): Promise<Activity> {
    const activitiy = await this.repository.findOne(id, {
      relations: ["activitiy_category"],
    });

    return activitiy;
  }
}

export { ActivitiesRepository };
