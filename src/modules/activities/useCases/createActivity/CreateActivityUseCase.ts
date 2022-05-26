import { inject, injectable } from "tsyringe";

import { ICreateActivityDTO } from "@modules/activities/dtos/ICreateActivityDTO";
import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";
import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";
import { ValidationError } from "@shared/errors/ValidationError";

@injectable()
class CreateActivityUseCase {
  constructor(
    @inject("ActivitiesRepository")
    private activitesRepository: IActivitiesRepository,
    @inject("ActivitiesCategoriesRepository")
    private activitiesCategoriesRepository: IActivitiesCategoriesRepository
  ) {}

  async execute({
    name,
    description,
    icon,
    activity_category_id,
  }: ICreateActivityDTO) {
    const activityExists = await this.activitesRepository.findByName(name);

    if (activityExists) {
      throw new ValidationError({ name: "Atividade já existente" });
    }

    const activityCategoryExists =
      await this.activitiesCategoriesRepository.findById(activity_category_id);

    if (!activityCategoryExists) {
      throw new ValidationError({
        activity_category_id: "Categoria não encontrada",
      });
    }

    const activity = await this.activitesRepository.create({
      name,
      description,
      icon,
      activity_category_id,
    });

    return activity;
  }
}

export { CreateActivityUseCase };
