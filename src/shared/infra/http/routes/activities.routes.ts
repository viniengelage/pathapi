import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateActivityCategoryController } from "@modules/activities/useCases/CreateActivityCategoryController";

const activitiesRoutes = Router();

const uploadIcon = multer(uploadConfig.upload("./tmp/icons"));

const createActivityCategoryController = new CreateActivityCategoryController();

activitiesRoutes.post(
  "/categories",
  uploadIcon.single("icon"),
  createActivityCategoryController.handle
);

export { activitiesRoutes };
