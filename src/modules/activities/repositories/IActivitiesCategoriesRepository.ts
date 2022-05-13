import { ICreateActivityCategoryDTO } from "@modules/activities/dtos/ICreateActivityCategoryDTO";
import { ActivityCategory } from "@modules/activities/infra/typeorm/entities/ActivityCategory";

import { IUpdateActivityCategoryDTO } from "../dtos/IUpdateActivityCategoryDTO";

interface IActivitiesCategoriesRepository {
  create(data: ICreateActivityCategoryDTO): Promise<ActivityCategory>;
  update(data: IUpdateActivityCategoryDTO): Promise<ActivityCategory>;
  findById(id: string): Promise<ActivityCategory>;
  findAll(): Promise<ActivityCategory[]>;
  findByName(name: string): Promise<ActivityCategory>;
}

export { IActivitiesCategoriesRepository };
