import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";

const authRoutes = Router();

const authenticateController = new AuthenticateUserController();
const createUserController = new CreateUserController();

authRoutes.post("/login", authenticateController.handle);
authRoutes.post("/register", createUserController.handle);

export { authRoutes };
