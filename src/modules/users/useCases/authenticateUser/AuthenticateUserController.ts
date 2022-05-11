import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, reponse: Response) {
    const { username, email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const session = {
      username,
      email,
      password,
    };

    if (username && email) {
      delete session.username;
    }

    if (!username && !email) {
      throw new AppError("Nome de usuário ou email não fornecidos", 422);
    }

    const createdSession = await authenticateUserUseCase.execute(session);

    return reponse.status(200).json(createdSession);
  }
}

export { AuthenticateUserController };
