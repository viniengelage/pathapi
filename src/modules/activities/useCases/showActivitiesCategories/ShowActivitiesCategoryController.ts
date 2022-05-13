import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowActivitiesCategoriesUseCase } from "./ShowActivitiesCategoriesUseCase";

class ShowActivitiesCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showActivitiesCategoriesUseCase = container.resolve(
      ShowActivitiesCategoriesUseCase
    );

    const activitiesCategories =
      await showActivitiesCategoriesUseCase.execute();

    return response.status(200).json(activitiesCategories);
  }
}

export { ShowActivitiesCategoryController };
