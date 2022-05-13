import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowUserUseCase } from "./ShowUserUseCase";

class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const detailUserUseCase = container.resolve(ShowUserUseCase);

    const user = await detailUserUseCase.execute(id);

    delete user.password;

    return response.status(200).json(user);
  }
}

export { ShowUserController };
