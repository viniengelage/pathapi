import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateActivityController } from "@modules/activities/useCases/createActivity/CreateActivityController";
import { CreateActivityCategoryController } from "@modules/activities/useCases/createActivityCategory/CreateActivityCategoryController";
import { ShowActivitiesCategoryController } from "@modules/activities/useCases/showActivitiesCategories/ShowActivitiesCategoryController";
import { ShowActivityController } from "@modules/activities/useCases/showActivity/ShowActivityController";
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

const createActivityController = new CreateActivityController();
const showActivityController = new ShowActivityController();

activitiesRoutes.get("/icons/:filename", showActivityIconController.handle);

activitiesRoutes.post(
  "/",
  uploadIcon.single("icon"),
  createActivityController.handle
);

activitiesRoutes.get("/categories", showActivitiesCategoriesController.handle);

activitiesRoutes.get("/:id", showActivityController.handle);

activitiesRoutes.post(
  "/categories",
  uploadIcon.single("icon"),
  createActivityCategoryController.handle
);

activitiesRoutes.put(
  "/categories/:id",
  updateActivityCategoryController.handle
);

activitiesRoutes.get("/categories/:id", showActivityCategoryController.handle);

export { activitiesRoutes };
