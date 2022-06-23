import { Request, Response } from "express";
import path from "path";

import { ShowActivityIconUseCase } from "./ShowActivityIconUseCase";

class ShowActivityIconController {
  async handle(request: Request, response: Response): Promise<void> {
    const { filename } = request.params;

    // const showActivityIconUseCase = new ShowActivityIconUseCase();

    // const icon = await showActivityIconUseCase.execute(filename);

    const iconDir = path.resolve(__dirname, `../../../../../tmp/icons`);

    console.log("Here", iconDir);

    return response.status(200).sendFile(`${iconDir}/${filename}`);
  }
}

export { ShowActivityIconController };
