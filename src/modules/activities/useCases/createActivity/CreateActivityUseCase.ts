import { inject, injectable } from "tsyringe";

import { ICreateActivityDTO } from "@modules/activities/dtos/ICreateActivityDTO";
import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";

@injectable()
class CreateActivityUseCase {
  constructor(
    @inject("ActivitiesRepository")
    private activitesRepository: IActivitiesRepository
  ) {}

  async execute({
    name,
    description,
    icon,
    activitiy_category_id,
  }: ICreateActivityDTO) {
    const activity = await this.activitesRepository.create({
      name,
      description,
      icon,
      activitiy_category_id,
    });

    return activity;
  }
}

export { CreateActivityUseCase };
