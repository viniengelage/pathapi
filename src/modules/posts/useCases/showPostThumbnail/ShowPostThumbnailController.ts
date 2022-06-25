import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowPostThumbnailUseCase } from "./ShowPostThumbnailUseCase";

class ShowPostThumbnailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPostThumbnailUseCase = container.resolve(
      ShowPostThumbnailUseCase
    );

    const thumbnail = await showPostThumbnailUseCase.execute(id);

    return response.status(200).send(thumbnail);
  }
}

export { ShowPostThumbnailController };
