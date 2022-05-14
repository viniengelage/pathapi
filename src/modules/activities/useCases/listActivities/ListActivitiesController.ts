import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListActivitiesUseCase } from "./ListActivitiesUseCase";

class ListActivitiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listActivitiesUseCase = container.resolve(ListActivitiesUseCase);

    const listActivities = await listActivitiesUseCase.execute();

    return response.status(200).json(listActivities);
  }
}

export { ListActivitiesController };
