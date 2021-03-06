import { v2 as cloudnary } from "cloudinary";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowActivityIconUseCase } from "./ShowActivityIconUseCase";

class ShowActivityIconController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showActivityIconUseCase = container.resolve(ShowActivityIconUseCase);

    const icon = await showActivityIconUseCase.execute(id);

    return response.status(200).send(icon);
  }
}

export { ShowActivityIconController };
