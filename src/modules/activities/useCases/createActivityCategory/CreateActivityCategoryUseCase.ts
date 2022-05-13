import { inject, injectable } from "tsyringe";

import { ICreateActivityCategoryDTO } from "@modules/activities/dtos/ICreateActivityCategoryDTO";
import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";
import { ValidationError } from "@shared/errors/ValidationError";

@injectable()
class CreateActivityCategoryUseCase {
  constructor(
    @inject("ActivitiesCategoriesRepository")
    private activitiesCategoriesRepository: IActivitiesCategoriesRepository
  ) {}

  async execute({ name, description, icon }: ICreateActivityCategoryDTO) {
    const activityCategoryExists =
      await this.activitiesCategoriesRepository.findByName(name);

    if (activityCategoryExists) {
      throw new ValidationError({ name: "Nome já utilizado" });
    }

    const activityCategory = await this.activitiesCategoriesRepository.create({
      name,
      description,
      icon,
    });

    return activityCategory;
  }
}

export { CreateActivityCategoryUseCase };
