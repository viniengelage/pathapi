import { inject, injectable } from "tsyringe";

import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";

@injectable()
class ShowActivitiesCategoriesUseCase {
  constructor(
    @inject("ActivitiesCategoriesRepository")
    private activitiesCategoriesRepository: IActivitiesCategoriesRepository
  ) {}

  async execute() {
    const activitiesCategories =
      await this.activitiesCategoriesRepository.findAll();

    return activitiesCategories;
  }
}

export { ShowActivitiesCategoriesUseCase };
