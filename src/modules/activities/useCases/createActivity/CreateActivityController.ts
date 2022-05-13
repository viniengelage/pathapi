import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateActivityUseCase } from "./CreateActivityUseCase";

class CreateActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, activitiy_category_id } = request.body;
    const icon = request.file.filename;

    const createActivityUseCase = container.resolve(CreateActivityUseCase);

    const activity = await createActivityUseCase.execute({
      name,
      description,
      activitiy_category_id,
      icon,
    });

    return response.status(200).json(activity);
  }
}

export { CreateActivityController };
