import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserActivityUseCase } from "./UpdateUserActivityUseCase";

class UpdateUserActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { activities_id } = request.body;

    const updateUserActivityUseCase = container.resolve(
      UpdateUserActivityUseCase
    );

    const updatedUserActivity = await updateUserActivityUseCase.execute({
      user_id,
      activities_id,
    });

    return response.status(200).json(updatedUserActivity);
  }
}

export { UpdateUserActivityController };
