import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowUserAvatarUseCase } from "./ShowUserAvatarUseCase";

class ShowUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserAvatarUseCase = container.resolve(ShowUserAvatarUseCase);

    const avatar = await showUserAvatarUseCase.execute(id);

    const avatarImage = cloudinary.image(avatar, { width: 256, height: 256 });

    return response.status(200).send(avatarImage);
  }
}

export { ShowUserAvatarController };
