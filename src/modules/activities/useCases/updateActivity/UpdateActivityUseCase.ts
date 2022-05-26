import { inject, injectable } from "tsyringe";

import { IUpdateActivityDTO } from "@modules/activities/dtos/IUpdateActivityDTO";
import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";
import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";
import { AppError } from "@shared/errors/AppError";
import { ValidationError } from "@shared/errors/ValidationError";

@injectable()
class UpdateActivityUseCase {
  constructor(
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository,
    @inject("ActivitiesCategoriesRepository")
    private activitiesCategoriesRepository: IActivitiesCategoriesRepository
  ) {}

  async execute({
    id,
    name,
    description,
    activity_category_id,
  }: IUpdateActivityDTO) {
    const activitiy = await this.activitiesRepository.findById(id);

    if (!activitiy) {
      throw new AppError("Activity não encontrada", 404);
    }

    const activitiyNameExists = await this.activitiesRepository.findByName(
      name
    );

    if (activitiyNameExists && activitiyNameExists.id !== activitiy.id) {
      throw new ValidationError({ name: "Nome já utilizado" });
    }

    const activityCategoryExists =
      await this.activitiesCategoriesRepository.findById(activity_category_id);

    if (!activityCategoryExists) {
      throw new AppError("Categoria de atividade não encontrada");
    }

    const updatedActivity = await this.activitiesRepository.update({
      id,
      name: name || activitiy.name,
      description: description || activitiy.description,
      activity_category_id:
        activity_category_id || activitiy.activity_category_id,
    });

    return updatedActivity;
  }
}

export { UpdateActivityUseCase };
