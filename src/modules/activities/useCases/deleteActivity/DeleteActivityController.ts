import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteActivityUseCase } from "./DeleteActivityUseCase";

class DeleteActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteActivityUseCase = container.resolve(DeleteActivityUseCase);

    await deleteActivityUseCase.execute(id);

    return response.status(201).send();
  }
}

export { DeleteActivityController };
