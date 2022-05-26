import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListActivitiesUseCase } from "./ListActivitiesUseCase";

class ListActivitiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { activity_category_id } = request.query;

    const listActivitiesUseCase = container.resolve(ListActivitiesUseCase);

    const listActivities = await listActivitiesUseCase.execute({
      activity_category_id: activity_category_id as string[],
    });

    return response.status(200).json(listActivities);
  }
}

export { ListActivitiesController };
