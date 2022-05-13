import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowUserAvatarUseCase } from "./ShowUserAvatarUseCase";

class ShowUserAvatarController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const showUserAvatarUseCase = container.resolve(ShowUserAvatarUseCase);

    const avatar = await showUserAvatarUseCase.execute(id);

    return response.status(200).download(`./tmp/avatar/${avatar}`);
  }
}

export { ShowUserAvatarController };
