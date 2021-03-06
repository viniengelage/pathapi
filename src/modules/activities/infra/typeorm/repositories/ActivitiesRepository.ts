import { getRepository, Repository, In } from "typeorm";

import { ICreateActivityDTO } from "@modules/activities/dtos/ICreateActivityDTO";
import { IUpdateActivityDTO } from "@modules/activities/dtos/IUpdateActivityDTO";
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
    activity_category_id,
  }: ICreateActivityDTO): Promise<Activity> {
    const activity = this.repository.create({
      name,
      description,
      activity_category_id,
      icon,
    });

    await this.repository.save(activity);

    return activity;
  }

  async update({
    id,
    name,
    description,
    activity_category_id,
    icon,
  }: IUpdateActivityDTO): Promise<Activity> {
    await this.repository.save({
      id,
      name,
      description,
      activity_category_id,
      icon,
    });

    const updatedActivity = await this.repository.findOne(id);

    return updatedActivity;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Activity> {
    const activitiy = await this.repository.findOne(id, {
      relations: ["activity_category"],
    });

    return activitiy;
  }

  async findAll(): Promise<Activity[]> {
    const listActivities = await this.repository.find();

    return listActivities;
  }

  async findByName(name: string): Promise<Activity> {
    const activitiy = await this.repository.findOne({ name });

    return activitiy;
  }

  async findByIds(ids: string[]): Promise<Activity[]> {
    const activities = await this.repository.findByIds(ids);

    return activities;
  }

  async findByCategoriesIds(ids: string[]): Promise<Activity[]> {
    const activities = await this.repository.find({
      activity_category_id: In(ids),
    });

    return activities;
  }
}

export { ActivitiesRepository };
