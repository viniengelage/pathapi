import { v2 as cloudnary } from "cloudinary";
import { inject, injectable } from "tsyringe";

import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowActivityIconUseCase {
  constructor(
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute(id: string): Promise<string> {
    const activity = await this.activitiesRepository.findById(id);

    if (!activity) {
      throw new AppError("Atividade não encontrada");
    }

    const file = cloudnary.image(activity.icon);

    return file;
  }
}

export { ShowActivityIconUseCase };
