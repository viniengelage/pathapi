import { v2 as cloudinary } from "cloudinary";
import { Router } from "express";
import multer from "multer";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";

import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";
import { ShowUserController } from "@modules/users/useCases/showUser/ShowUserController";
import { ShowUserAvatarController } from "@modules/users/useCases/showUserAvatar/ShowUserAvatarController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { UpdateUserActivityController } from "@modules/users/useCases/updateUserActivity/UpdateUserActivityController";
import { UpdateUserAvatarController } from "@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";
import { UpdateUserPasswordController } from "@modules/users/useCases/updateUserPassword/UpdateUserPasswordController";
import { ensureAuthenticated } from "@shared/infra/middlewares/ensureAuthenticated";
import { is } from "@shared/infra/middlewares/permission";

declare interface ICloudinaryOptions extends Options {
  params: {
    folder: string;
  };
}

const storageOptions: ICloudinaryOptions = {
  cloudinary,
  params: {
    folder: "avatars",
  },
};

const usersRouter = Router();

const storage = new CloudinaryStorage(storageOptions);

const uploadAvatar = multer({ storage });

const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const showUserController = new ShowUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const showUserAvatarController = new ShowUserAvatarController();
const updateUserActivityController = new UpdateUserActivityController();
const updateUserPasswordController = new UpdateUserPasswordController();

usersRouter.get(
  "/",
  ensureAuthenticated,
  is("admin"),
  listUsersController.handle
);

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

usersRouter.patch(
  "/me/activities",
  ensureAuthenticated,
  updateUserActivityController.handle
);

usersRouter.put(
  "/me/password",
  ensureAuthenticated,
  updateUserPasswordController.handle
);

usersRouter.put("/", ensureAuthenticated, updateUserController.handle);

usersRouter.delete("/", ensureAuthenticated, deleteUserController.handle);

export { usersRouter };
