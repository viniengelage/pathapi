import { v2 as cloudnary } from "cloudinary";
import { inject, injectable } from "tsyringe";

import { ActivityCategory } from "@modules/activities/infra/typeorm/entities/ActivityCategory";
import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";

interface IRequest {
  activity_id: string;
  icon: string;
}

@injectable()
class UpdateActivityCategoryIconUseCase {
  constructor(
    @inject("ActivitiesCategoriesRepository")
    private activitiesCategoriesRepository: IActivitiesCategoriesRepository
  ) {}

  async execute({ activity_id, icon }: IRequest): Promise<string> {
    const activity = await this.activitiesCategoriesRepository.findById(
      activity_id
    );

    if (!activity) {
      throw new AppError("Atividade não encontrada");
    }

    cloudnary.uploader.destroy(activity.icon);

    activity.icon = icon;

    const updatedActivity = await this.activitiesCategoriesRepository.update(
      activity
    );

    return updatedActivity.icon;
  }
}

export { UpdateActivityCategoryIconUseCase };
