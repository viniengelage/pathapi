import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateActivityCategoryController } from "@modules/activities/useCases/createActivityCategory/CreateActivityCategoryController";
import { ShowActivitiesCategoryController } from "@modules/activities/useCases/showActivitiesCategories/ShowActivitiesCategoryController";
import { ShowActivityCategoryController } from "@modules/activities/useCases/showActivityCategory/ShowActivityCategoryController";
import { ShowActivityIconController } from "@modules/activities/useCases/showActivityIcon/ShowActivityIconController";
import { UpdateActivityCategoryController } from "@modules/activities/useCases/updateActivityCategory/UpdateActivityCategoryController";

const activitiesRoutes = Router();

const uploadIcon = multer(uploadConfig.upload("./tmp/icons"));

const createActivityCategoryController = new CreateActivityCategoryController();
const showActivityCategoryController = new ShowActivityCategoryController();
const showActivityIconController = new ShowActivityIconController();
const updateActivityCategoryController = new UpdateActivityCategoryController();
const showActivitiesCategoriesController =
  new ShowActivitiesCategoryController();

activitiesRoutes.post(
  "/categories",
  uploadIcon.single("icon"),
  createActivityCategoryController.handle
);

activitiesRoutes.get("/categories", showActivitiesCategoriesController.handle);

activitiesRoutes.put(
  "/categories/:id",
  updateActivityCategoryController.handle
);

activitiesRoutes.get("/categories/:id", showActivityCategoryController.handle);

activitiesRoutes.get("/icons/:filename", showActivityIconController.handle);

export { activitiesRoutes };
