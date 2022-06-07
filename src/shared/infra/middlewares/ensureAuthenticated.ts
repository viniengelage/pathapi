import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/users/infra/typeorm/repositories/UsersTokensRepository";
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
    const { sub: user_id } = verify(
      token,
      process.env.JWT_REFRESH_SECRET
    ) as IPayload;

    const usersRepository = new UsersTokensRepository();

    const user = await usersRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exists");
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    console.log(error);
    throw new AppError("Token inválido");
  }
}
