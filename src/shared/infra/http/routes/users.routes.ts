import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";
import { ShowUserController } from "@modules/users/useCases/showUser/ShowUserController";
import { ShowUserAvatarController } from "@modules/users/useCases/showUserAvatar/ShowUserAvatarController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { UpdateUserAvatarController } from "@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/middlewares/ensureAuthenticated";

import { CreateUserController } from "../../../../modules/users/useCases/createUser/CreateUserController";

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const showUserController = new ShowUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const showUserAvatarController = new ShowUserAvatarController();

usersRouter.post("/", createUserController.handle);
usersRouter.get("/", listUsersController.handle);
usersRouter.get("/me", ensureAuthenticated, showUserController.handle);
usersRouter.get(
  "/me/avatar",
  ensureAuthenticated,
  showUserAvatarController.handle
);
usersRouter.patch(
  "/me/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
usersRouter.put("/", ensureAuthenticated, updateUserController.handle);
usersRouter.delete("/", ensureAuthenticated, deleteUserController.handle);

export { usersRouter };
