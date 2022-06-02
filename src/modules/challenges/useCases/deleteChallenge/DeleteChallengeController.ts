import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteChallengeUseCase } from "./DeleteChallengeUseCase";

class DeleteChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteChallengeUseCase = container.resolve(DeleteChallengeUseCase);

    await deleteChallengeUseCase.execute(id);

    return response.status(204).send();
  }
}

export { DeleteChallengeController };
