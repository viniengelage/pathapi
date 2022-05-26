import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateActivityUseCase } from "./UpdateActivityUseCase";

class UpdateActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, activity_category_id } = request.body;

    const updateActivityUseCase = container.resolve(UpdateActivityUseCase);

    const updatedActivity = await updateActivityUseCase.execute({
      id,
      name,
      description,
      activity_category_id,
    });

    return response.status(200).json(updatedActivity);
  }
}

export { UpdateActivityController };
