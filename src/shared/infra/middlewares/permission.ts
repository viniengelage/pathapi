import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

type IRole = "admin" | "customer" | "professional";

export function is(role: IRole | IRole[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    let roleExists = false;

    if (Array.isArray(role)) {
      roleExists = !!role.find((r) => r === user.role);
    } else {
      roleExists = role === user.role;
    }

    if (!roleExists) {
      throw new AppError("Você não tem permissão para executar essa ação", 403);
    }

    return next();
  };
}
