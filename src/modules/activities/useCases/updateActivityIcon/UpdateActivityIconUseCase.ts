import { inject, injectable } from "tsyringe";

import { Activity } from "@modules/activities/infra/typeorm/entities/Activity";
import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";

interface IRequest {
  activity_id: string;
  icon: string;
}

@injectable()
class UpdateActivityIconUseCase {
  constructor(
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({ activity_id, icon }: IRequest): Promise<Activity> {
    const activity = await this.activitiesRepository.findById(activity_id);

    if (!activity) {
      throw new AppError("Atividade não encontrada");
    }

    await deleteFile(`./tmp/icons/${activity.icon}`);

    activity.icon = icon;

    const updatedActivity = await this.activitiesRepository.update(activity);

    return updatedActivity;
  }
}

export { UpdateActivityIconUseCase };
