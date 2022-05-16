import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateActivityController } from "@modules/activities/useCases/createActivity/CreateActivityController";
import { CreateActivityCategoryController } from "@modules/activities/useCases/createActivityCategory/CreateActivityCategoryController";
import { DeleteActivityController } from "@modules/activities/useCases/deleteActivity/DeleteActivityController";
import { ListActivitiesController } from "@modules/activities/useCases/listActivities/ListActivitiesController";
import { ListActivitiesCategoryController } from "@modules/activities/useCases/listActivitiesCategories/ListActivitiesCategoryController";
import { ShowActivityController } from "@modules/activities/useCases/showActivity/ShowActivityController";
import { ShowActivityCategoryController } from "@modules/activities/useCases/showActivityCategory/ShowActivityCategoryController";
import { ShowActivityIconController } from "@modules/activities/useCases/showActivityIcon/ShowActivityIconController";
import { UpdateActivityController } from "@modules/activities/useCases/updateActivity/UpdateActivityController";
import { UpdateActivityCategoryController } from "@modules/activities/useCases/updateActivityCategory/UpdateActivityCategoryController";
import { UpdateActivityIconController } from "@modules/activities/useCases/updateActivityIcon/UpdateActivityIconController";
import { ensureAuthenticated } from "@shared/infra/middlewares/ensureAuthenticated";
import { is } from "@shared/infra/middlewares/permission";

const activitiesRoutes = Router();

const uploadIcon = multer(uploadConfig.upload("./tmp/icons"));

const createActivityCategoryController = new CreateActivityCategoryController();
const showActivityCategoryController = new ShowActivityCategoryController();
const showActivityIconController = new ShowActivityIconController();
const updateActivityCategoryController = new UpdateActivityCategoryController();
const listActivitiesCategoriesController =
  new ListActivitiesCategoryController();
const updateActivityCategoryIconController = new UpdateActivityIconController();

const createActivityController = new CreateActivityController();
const showActivityController = new ShowActivityController();
const listActivitiesController = new ListActivitiesController();
const updatedActivityController = new UpdateActivityController();
const deleteActivityController = new DeleteActivityController();
const updateActivityIconController = new UpdateActivityIconController();

activitiesRoutes.use(ensureAuthenticated);
activitiesRoutes.use(is("admin"));

activitiesRoutes.get("/icons/:filename", showActivityIconController.handle);

activitiesRoutes.post(
  "/",
  uploadIcon.single("icon"),
  createActivityController.handle
);

activitiesRoutes.get("/", listActivitiesController.handle);

activitiesRoutes.get("/categories", listActivitiesCategoriesController.handle);

activitiesRoutes.get("/:id", showActivityController.handle);
activitiesRoutes.put("/:id", updatedActivityController.handle);
activitiesRoutes.delete("/:id", deleteActivityController.handle);

activitiesRoutes.patch(
  "/:id/icon",
  uploadIcon.single("icon"),
  updateActivityIconController.handle
);

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
activitiesRoutes.patch(
  "/categories/:id/icon",
  uploadIcon.single("icon"),
  updateActivityCategoryIconController.handle
);

export { activitiesRoutes };
