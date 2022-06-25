import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowChallengeIconUseCase } from "./ShowChallengeIconUseCase";

class ShowChallengeIconController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showChallengeIconUseCase = container.resolve(
      ShowChallengeIconUseCase
    );

    const icon = await showChallengeIconUseCase.execute(id);

    const iconFile = cloudinary.image(icon);

    return response.status(200).send(iconFile);
  }
}

export { ShowChallengeIconController };
