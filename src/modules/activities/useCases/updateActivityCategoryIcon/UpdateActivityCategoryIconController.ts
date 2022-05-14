import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateActivityCategoryIconUseCase } from "./UpdateActivityCategoryIconUseCase";

class UpdateActivityCategoryIconController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: activity_id } = request.params;
    const icon = request.file.filename;

    const updateActivityIconUseCase = container.resolve(
      UpdateActivityCategoryIconUseCase
    );

    const updatedActivityIcon = await updateActivityIconUseCase.execute({
      activity_id,
      icon,
    });

    return response.status(201).json(updatedActivityIcon);
  }
}

export { UpdateActivityCategoryIconController };
