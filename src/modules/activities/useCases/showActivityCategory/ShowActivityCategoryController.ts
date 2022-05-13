import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowActivityCategoryUseCase } from "./ShowActivityCategoryUseCase";

class ShowActivityCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showActivityCategoryUseCase = container.resolve(
      ShowActivityCategoryUseCase
    );

    const activityCategory = await showActivityCategoryUseCase.execute(id);

    return response.status(200).json(activityCategory);
  }
}

export { ShowActivityCategoryController };
