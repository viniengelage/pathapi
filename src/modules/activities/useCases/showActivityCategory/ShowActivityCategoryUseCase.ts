import { inject, injectable } from "tsyringe";

import { ActivityCategory } from "@modules/activities/infra/typeorm/entities/ActivityCategory";
import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowActivityCategoryUseCase {
  constructor(
    @inject("ActivitiesCategoriesRepository")
    private activitiesCategoriesRepository: IActivitiesCategoriesRepository
  ) {}

  async execute(id: string): Promise<ActivityCategory> {
    const activityCategory = this.activitiesCategoriesRepository.findById(id);

    if (!activityCategory) {
      throw new AppError("Activity category not found", 404);
    }

    return activityCategory;
  }
}

export { ShowActivityCategoryUseCase };
