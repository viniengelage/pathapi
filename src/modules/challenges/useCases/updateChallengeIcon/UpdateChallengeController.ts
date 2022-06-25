import { v2 as cloudinary } from "cloudinary";
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

    const upatedChallenge = await updateChallengeIconUseCase.execute({
      challenge_id,
      icon_file,
    });

    const icon = cloudinary.image(upatedChallenge.icon);

    return response.status(200).send(icon);
  }
}

export { UpdateChallengeIconController };
