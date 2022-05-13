import { getRepository, Repository } from "typeorm";

import { ICreateActivityCategoryDTO } from "@modules/activities/dtos/ICreateActivityCategoryDTO";
import { IUpdateActivityCategoryDTO } from "@modules/activities/dtos/IUpdateActivityCategoryDTO";
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

  async update({
    id,
    name,
    description,
    icon,
  }: IUpdateActivityCategoryDTO): Promise<ActivityCategory> {
    console.log("hey", icon);

    await this.repository.update(id, {
      name,
      description,
      icon,
    });

    const updatedActivityCategory = await this.repository.findOne(id);

    return updatedActivityCategory;
  }

  async findById(id: string): Promise<ActivityCategory> {
    const activityCategory = await this.repository.findOne(id);

    return activityCategory;
  }

  async findAll(): Promise<ActivityCategory[]> {
    const activitiesCategories = await this.repository.find();

    return activitiesCategories;
  }

  async findByName(name: string): Promise<ActivityCategory> {
    const activityCategory = await this.repository.findOne({ name });

    return activityCategory;
  }
}

export { ActivitiesCategoriesRepository };
