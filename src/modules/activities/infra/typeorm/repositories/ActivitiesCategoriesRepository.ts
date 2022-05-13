import { getRepository, Repository } from "typeorm";

import { ICreateActivityCategoryDTO } from "@modules/activities/dtos/ICreateActivityCategoryDTO";
import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";

import { ActivityCategory } from "../entities/ActivityCategory";

class ActivitiesCategoriesRepository
  implements IActivitiesCategoriesRepository
{
  repository: Repository<ActivityCategory>;

  constructor() {
    this.repository = getRepository(ActivityCategory);
  }

  async create({
    name,
    description,
    icon,
  }: ICreateActivityCategoryDTO): Promise<ActivityCategory> {
    const activityCategory = this.repository.create({
      name,
      description,
      icon,
    });

    await this.repository.save(activityCategory);

    return activityCategory;
  }
}

export { ActivitiesCategoriesRepository };
