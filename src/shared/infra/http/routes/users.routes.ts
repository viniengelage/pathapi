import { Router } from "express";

import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";

import { CreateUserController } from "../../../../modules/users/useCases/createUser/CreateUserController";

const usersRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRouter.post("/", createUserController.handle);
usersRouter.get("/", listUsersController.handle);

export { usersRouter };
