import { v2 as cloudinary } from "cloudinary";
import { Router } from "express";
import multer from "multer";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";

import uploadConfig from "@config/upload";
import { CreateActivityController } from "@modules/activities/useCases/createActivity/CreateActivityController";
import { CreateActivityCategoryController } from "@modules/activities/useCases/createActivityCategory/CreateActivityCategoryController";
import { DeleteActivityController } from "@modules/activities/useCases/deleteActivity/DeleteActivityController";
import { ListActivitiesController } from "@modules/activities/useCases/listActivities/ListActivitiesController";
import { ListActivitiesCategoryController } from "@modules/activities/useCases/listActivitiesCategories/ListActivitiesCategoryController";
import { ShowActivityController } from "@modules/activities/useCases/showActivity/ShowActivityController";
import { ShowActivityCategoryController } from "@modules/activities/useCases/showActivityCategory/ShowActivityCategoryController";
import { ShowActivityCategoryIconController } from "@modules/activities/useCases/showActivityCategoryIcon/ShowActivityCategoryIconController";
import { ShowActivityIconController } from "@modules/activities/useCases/showActivityIcon/ShowActivityIconController";
import { UpdateActivityController } from "@modules/activities/useCases/updateActivity/UpdateActivityController";
import { UpdateActivityCategoryController } from "@modules/activities/useCases/updateActivityCategory/UpdateActivityCategoryController";
import { UpdateActivityIconController } from "@modules/activities/useCases/updateActivityIcon/UpdateActivityIconController";
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
    folder: "activities",
  },
};

const activitiesRoutes = Router();

const storage = new CloudinaryStorage(storageOptions);

const uploadIcon = multer({ storage });

const createActivityCategoryController = new CreateActivityCategoryController();
const showActivityCategoryController = new ShowActivityCategoryController();
const showActivityIconController = new ShowActivityIconController();
const updateActivityCategoryController = new UpdateActivityCategoryController();
const listActivitiesCategoriesController =
  new ListActivitiesCategoryController();
const updateActivityCategoryIconController = new UpdateActivityIconController();

const showActivityActivityIconController =
  new ShowActivityCategoryIconController();
const createActivityController = new CreateActivityController();
const showActivityController = new ShowActivityController();
const listActivitiesController = new ListActivitiesController();
const updatedActivityController = new UpdateActivityController();
const deleteActivityController = new DeleteActivityController();
const updateActivityIconController = new UpdateActivityIconController();

activitiesRoutes.get("/categories", listActivitiesCategoriesController.handle);
activitiesRoutes.get("/categories/:id", showActivityCategoryController.handle);
activitiesRoutes.get("/", listActivitiesController.handle);
activitiesRoutes.get(
  "/categories/:id/icon",
  showActivityActivityIconController.handle
);
activitiesRoutes.get("/:id", showActivityController.handle);
activitiesRoutes.get("/:id/icon", showActivityIconController.handle);

activitiesRoutes.use(ensureAuthenticated);
activitiesRoutes.use(is("admin"));

activitiesRoutes.post(
  "/",
  uploadIcon.single("icon"),
  createActivityController.handle
);

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

activitiesRoutes.patch(
  "/categories/:id/icon",
  uploadIcon.single("icon"),
  updateActivityCategoryIconController.handle
);

export { activitiesRoutes };
