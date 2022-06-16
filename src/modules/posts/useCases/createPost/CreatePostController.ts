import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePostUseCase } from "./CreatePostUseCase";

class CreatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, content, see_more_url } = request.body;
    const { id } = request.user;

    const createpostUseCase = container.resolve(CreatePostUseCase);

    const post = await createpostUseCase.execute({
      title,
      description,
      content,
      see_more_url,
      user_id: id,
    });

    return response.status(201).json(post);
  }
}

export { CreatePostController };
