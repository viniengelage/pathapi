import { inject, injectable } from "tsyringe";

import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowActivityUseCase {
  constructor(
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute(id: string) {
    const activitiy = await this.activitiesRepository.findById(id);

    if (!activitiy) {
      throw new AppError("Activity not found", 404);
    }

    return activitiy;
  }
}

export { ShowActivityUseCase };
