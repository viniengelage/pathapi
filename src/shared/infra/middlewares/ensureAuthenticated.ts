import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token inexistente");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, process.env.JWT_SECRET) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists");
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Token inválido");
  }
}
