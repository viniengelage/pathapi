import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowActivityCategoryIconUseCase } from "./ShowActivityCategoryIconUseCase";

class ShowActivityCategoryIconController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showActivityIconUseCase = container.resolve(
      ShowActivityCategoryIconUseCase
    );

    const icon = await showActivityIconUseCase.execute(id);

    return response.status(200).send(icon);
  }
}

export { ShowActivityCategoryIconController };
