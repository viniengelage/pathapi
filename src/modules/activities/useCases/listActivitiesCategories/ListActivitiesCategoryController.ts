import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListActivitiesCategoriesUseCase } from "./ListActivitiesCategoriesUseCase";

class ListActivitiesCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showActivitiesCategoriesUseCase = container.resolve(
      ListActivitiesCategoriesUseCase
    );

    const activitiesCategories =
      await showActivitiesCategoriesUseCase.execute();

    return response.status(200).json(activitiesCategories);
  }
}

export { ListActivitiesCategoryController };
