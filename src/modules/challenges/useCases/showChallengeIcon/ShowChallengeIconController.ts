import { Request, Response } from "express";
import path from "path";
import { container } from "tsyringe";

import { ShowChallengeIconUseCase } from "./ShowChallengeIconUseCase";

class ShowChallengeIconController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const showChallengeIconUseCase = container.resolve(
      ShowChallengeIconUseCase
    );

    const icon = await showChallengeIconUseCase.execute(id);

    const iconDir = path.resolve(__dirname, `../../../../../tmp/icons`);

    return response.status(200).sendFile(`${iconDir}/${icon}`);
  }
}

export { ShowChallengeIconController };
