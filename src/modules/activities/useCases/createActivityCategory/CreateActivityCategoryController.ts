import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateActivityCategoryUseCase } from "./CreateActivityCategoryUseCase";

class CreateActivityCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const icon = request.file.filename;

    const createActivityCategoryUseCase = container.resolve(
      CreateActivityCategoryUseCase
    );

    const activityCategory = await createActivityCategoryUseCase.execute({
      name,
      description,
      icon,
    });

    return response.status(202).json(activityCategory);
  }
}

export { CreateActivityCategoryController };
