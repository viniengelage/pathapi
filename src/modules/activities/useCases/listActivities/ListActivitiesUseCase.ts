import { inject, injectable } from "tsyringe";

import { Activity } from "@modules/activities/infra/typeorm/entities/Activity";
import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";

interface IRequest {
  activity_category_id: string[];
}

@injectable()
class ListActivitiesUseCase {
  constructor(
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({ activity_category_id }: IRequest) {
    let listActivities: Activity[];

    if (activity_category_id) {
      let activitiesCategoriesId = activity_category_id;

      if (!Array.isArray(activity_category_id)) {
        activitiesCategoriesId = [activity_category_id];
      }

      listActivities = await this.activitiesRepository.findByCategoriesIds(
        activitiesCategoriesId
      );
    } else {
      listActivities = await this.activitiesRepository.findAll();
    }

    return listActivities;
  }
}

export { ListActivitiesUseCase };
