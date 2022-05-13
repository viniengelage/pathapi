import { ICreateActivityCategoryDTO } from "../dtos/ICreateActivityCategoryDTO";
import { ActivityCategory } from "../infra/typeorm/entities/ActivityCategory";

interface IActivitiesCategoriesRepository {
  create(data: ICreateActivityCategoryDTO): Promise<ActivityCategory>;
}

export { IActivitiesCategoriesRepository };
