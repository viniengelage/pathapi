import { Router } from "express";

import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { ensureAuthenticated } from "@shared/infra/middlewares/ensureAuthenticated";
import { is } from "@shared/infra/middlewares/permission";

const createPostController = new CreatePostController();

const postsRoutes = Router();

postsRoutes.post(
  "/",
  ensureAuthenticated,
  is("admin"),
  createPostController.handle
);

export { postsRoutes };
