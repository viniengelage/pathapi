import { v2 as cloudnary } from "cloudinary";
import { inject, injectable } from "tsyringe";

import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowActivityCategoryIconUseCase {
  constructor(
    @inject("ActivitiesCategoriesRepository")
    private activitiesCategpories: IActivitiesCategoriesRepository
  ) {}

  async execute(id: string): Promise<string> {
    const activity = await this.activitiesCategpories.findById(id);

    if (!activity) {
      throw new AppError("Atividade não encontrada");
    }

    const file = cloudnary.image(activity.icon);

    return file;
  }
}

export { ShowActivityCategoryIconUseCase };
