import { inject, injectable } from "tsyringe";

import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteActivityUseCase {
  constructor(
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const activity = await this.activitiesRepository.findById(id);

    if (!activity) {
      throw new AppError("Atividade não encontrada", 404);
    }

    await this.activitiesRepository.delete(id);
  }
}

export { DeleteActivityUseCase };
