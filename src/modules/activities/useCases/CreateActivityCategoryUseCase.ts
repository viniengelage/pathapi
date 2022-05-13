import { inject, injectable } from "tsyringe";

import { ICreateActivityCategoryDTO } from "../dtos/ICreateActivityCategoryDTO";
import { IActivitiesCategoriesRepository } from "../repositories/IActivitiesCategoriesRepository";

@injectable()
class CreateActivityCategoryUseCase {
  constructor(
    @inject("ActivitiesCategoriesRepository")
    private activitiesCategoriesRepository: IActivitiesCategoriesRepository
  ) {}

  async execute({ name, description, icon }: ICreateActivityCategoryDTO) {
    console.log("here");

    const activityCategory = await this.activitiesCategoriesRepository.create({
      name,
      description,
      icon,
    });

    return activityCategory;
  }
}

export { CreateActivityCategoryUseCase };
