import fs from "fs";

import { AppError } from "@shared/errors/AppError";

class ShowActivityIconUseCase {
  async execute(filename: string): Promise<string> {
    const fileUrl = `${filename}`;

    try {
      await fs.promises.stat(fileUrl);
    } catch (error) {
      throw new AppError("Image not found", 404);
    }

    return fileUrl;
  }
}

export { ShowActivityIconUseCase };
