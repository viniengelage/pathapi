import { inject, injectable } from "tsyringe";

import { IUpdateActivityCategoryDTO } from "@modules/activities/dtos/IUpdateActivityCategoryDTO";
import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { ValidationError } from "@shared/errors/ValidationError";

@injectable()
class UpdateActivityCategoryUseCase {
  constructor(
    @inject("ActivitiesCategoriesRepository")
    private activitiesCategoriesRepository: IActivitiesCategoriesRepository
  ) {}

  async execute({ id, name, description }: IUpdateActivityCategoryDTO) {
    const activityCategoryExists =
      await this.activitiesCategoriesRepository.findByName(name);

    if (activityCategoryExists) {
      throw new ValidationError({ name: "Nome já utilizado" });
    }

    const activityCategory = await this.activitiesCategoriesRepository.findById(
      id
    );

    if (!activityCategory) {
      throw new AppError("Activity category not found", 404);
    }

    const updatedActivityCategory =
      await this.activitiesCategoriesRepository.update({
        id,
        name: name || activityCategory.name,
        description: description || activityCategory.description,
        icon: activityCategory.icon,
      });

    return updatedActivityCategory;
  }
}

export { UpdateActivityCategoryUseCase };
