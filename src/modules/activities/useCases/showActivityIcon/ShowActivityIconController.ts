import { Request, Response } from "express";

import { ShowActivityIconUseCase } from "./ShowActivityIconUseCase";

class ShowActivityIconController {
  async handle(request: Request, response: Response): Promise<void> {
    const { filename } = request.params;

    const showActivityIconUseCase = new ShowActivityIconUseCase();

    const icon = await showActivityIconUseCase.execute(filename);

    return response.status(200).download(icon);
  }
}

export { ShowActivityIconController };
