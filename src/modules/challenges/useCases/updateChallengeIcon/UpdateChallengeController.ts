import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateChallengeIconUseCase } from "./UpdateChallengeIconUseCase";

class UpdateChallengeIconController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: challenge_id } = request.params;
    const icon_file = request.file.filename;

    const updateChallengeIconUseCase = container.resolve(
      UpdateChallengeIconUseCase
    );

    const upatedChallengeIcon = await updateChallengeIconUseCase.execute({
      challenge_id,
      icon_file,
    });

    return response.status(200).json(upatedChallengeIcon);
  }
}

export { UpdateChallengeIconController };
