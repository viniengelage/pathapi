import { inject, injectable } from "tsyringe";

import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";

@injectable()
class ListActivitiesUseCase {
  constructor(
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute() {
    const listActivities = await this.activitiesRepository.findAll();

    return listActivities;
  }
}

export { ListActivitiesUseCase };
