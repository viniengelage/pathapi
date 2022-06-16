import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { ShowPostController } from "@modules/posts/useCases/showPost/ShowPostController";
import { ensureAuthenticated } from "@shared/infra/middlewares/ensureAuthenticated";
import { is } from "@shared/infra/middlewares/permission";

const uploadThumbnail = multer(uploadConfig.upload("./tmp/thumbnail"));

const createPostController = new CreatePostController();
const showPostController = new ShowPostController();

const postsRoutes = Router();

postsRoutes.post(
  "/",
  ensureAuthenticated,
  is("admin"),
  uploadThumbnail.single("thumbnail"),
  createPostController.handle
);

postsRoutes.get("/:id", showPostController.handle);

export { postsRoutes };
