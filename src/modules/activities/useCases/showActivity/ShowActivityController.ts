import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowActivityUseCase } from "./ShowActivityUseCase";

class ShowActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showActivityUseCase = container.resolve(ShowActivityUseCase);

    const activitiy = await showActivityUseCase.execute(id);

    return response.status(200).json(activitiy);
  }
}

export { ShowActivityController };
