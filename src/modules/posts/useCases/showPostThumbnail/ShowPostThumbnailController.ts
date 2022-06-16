import { Request, Response } from "express";
import path from "path";
import { container } from "tsyringe";

import { ShowPostThumbnailUseCase } from "./ShowPostThumbnailUseCase";

class ShowPostThumbnailController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const showPostThumbnailUseCase = container.resolve(
      ShowPostThumbnailUseCase
    );

    const thumbnail = await showPostThumbnailUseCase.execute(id);

    const thumbnailDir = path.resolve(
      __dirname,
      `../../../../../tmp/thumbnail`
    );

    return response.status(200).sendFile(`${thumbnailDir}/${thumbnail}`);
  }
}

export { ShowPostThumbnailController };
