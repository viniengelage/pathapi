import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";

const authRoutes = Router();

const authenticateController = new AuthenticateUserController();

authRoutes.post("/login", authenticateController.handle);

export { authRoutes };
