import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPostsUseCase } from "./ListPostsUseCase";

class ListPostsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.query;

    const listPostsController = container.resolve(ListPostsUseCase);

    const posts = await listPostsController.execute(user_id as string);

    return response.status(200).json(posts);
  }
}

export { ListPostsController };
