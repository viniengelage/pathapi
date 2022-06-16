import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { DeletePostController } from "@modules/posts/useCases/deletePost/DeletePostController";
import { ListPostsController } from "@modules/posts/useCases/listPosts/ListPostsController";
import { ShowPostController } from "@modules/posts/useCases/showPost/ShowPostController";
import { ShowPostThumbnailController } from "@modules/posts/useCases/showPostThumbnail/ShowPostThumbnailController";
import { UpdatePostController } from "@modules/posts/useCases/updatePost/UpdatePostController";
import { ensureAuthenticated } from "@shared/infra/middlewares/ensureAuthenticated";
import { is } from "@shared/infra/middlewares/permission";

const uploadThumbnail = multer(uploadConfig.upload("./tmp/thumbnail"));

const createPostController = new CreatePostController();
const listPostsController = new ListPostsController();
const showPostController = new ShowPostController();
const showPostThumbnailController = new ShowPostThumbnailController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();

const postsRoutes = Router();

postsRoutes.post(
  "/",
  ensureAuthenticated,
  is("professional"),
  uploadThumbnail.single("thumbnail"),
  createPostController.handle
);

postsRoutes.get("/", listPostsController.handle);
postsRoutes.get("/:id", showPostController.handle);
postsRoutes.get("/:id/thumbnail", showPostThumbnailController.handle);
postsRoutes.put(
  "/:id",
  uploadThumbnail.single("thumbnail"),
  ensureAuthenticated,
  updatePostController.handle
);

postsRoutes.delete("/:id", ensureAuthenticated, deletePostController.handle);

export { postsRoutes };
