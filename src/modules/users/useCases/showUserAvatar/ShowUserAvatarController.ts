import { Request, Response } from "express";
import path from "path";
import { container } from "tsyringe";

import { ShowUserAvatarUseCase } from "./ShowUserAvatarUseCase";

class ShowUserAvatarController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.user;

    const showUserAvatarUseCase = container.resolve(ShowUserAvatarUseCase);

    const avatar = await showUserAvatarUseCase.execute(id);

    const avatarDir = path.resolve(__dirname, `../../../../../tmp/avatar`);

    return response.status(200).sendFile(`${avatarDir}/${avatar}`);
  }
}

export { ShowUserAvatarController };
