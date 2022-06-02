import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUserChallengeUseCase } from "./DeleteUserChallengeUseCase";

class DeleteUserChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserChallengeUseCase = container.resolve(
      DeleteUserChallengeUseCase
    );

    await deleteUserChallengeUseCase.execute(id);

    return response.status(204).send();
  }
}

export { DeleteUserChallengeController };
