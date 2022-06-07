import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { RefreshTokenController } from "@modules/users/useCases/refreshToken/RefreshTokenController";
import { SendForgotPasswordMailController } from "@modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const authRoutes = Router();

const authenticateController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const refreshTokenController = new RefreshTokenController();

const sendForgotPasswordController = new SendForgotPasswordMailController();

authRoutes.post("/login", authenticateController.handle);
authRoutes.post("/register", createUserController.handle);
authRoutes.post("/refresh-token", refreshTokenController.handle);

authRoutes.post("/password/forgot", sendForgotPasswordController.handle);

export { authRoutes };
