import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowPostUseCase } from "./ShowPostUseCase";

class ShowPostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPostUseCase = container.resolve(ShowPostUseCase);

    const post = await showPostUseCase.execute(id);

    return response.status(200).json(post);
  }
}

export { ShowPostController };
