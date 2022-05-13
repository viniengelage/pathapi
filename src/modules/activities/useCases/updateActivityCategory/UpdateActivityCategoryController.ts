import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateActivityCategoryUseCase } from "./UpdateActivityCategoryUseCase";

class UpdateActivityCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const updateActivityUseCase = container.resolve(
      UpdateActivityCategoryUseCase
    );

    const updatedUser = await updateActivityUseCase.execute({
      id,
      name,
      description,
    });

    return response.status(200).json(updatedUser);
  }
}

export { UpdateActivityCategoryController };
