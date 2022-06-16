import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdatePostUseCase } from "./UpdatePostUseCase";

class UpdatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, content, see_more_url } = request.body;
    const { id } = request.params;
    const { id: user_id } = request.user;
    const thumbnail = request.file?.filename;

    const updatePostUseCase = container.resolve(UpdatePostUseCase);

    const updatedPost = await updatePostUseCase.execute({
      id,
      title,
      description,
      content,
      see_more_url,
      user_id,
      thumbnail,
    });

    return response.status(200).json(updatedPost);
  }
}

export { UpdatePostController };
