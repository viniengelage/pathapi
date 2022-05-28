import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateChallengeController } from "@modules/challenges/useCases/createChallenge/CreateChallengeController";
import { ShowChallengeIconController } from "@modules/challenges/useCases/showChallengeIcon/ShowChallengeIconController";
import { UpdateChallengeIconController } from "@modules/challenges/useCases/updateChallengeIcon/UpdateChallengeController";

const challengesRoutes = Router();

const uploadIcon = multer(uploadConfig.upload("./tmp/icons"));

const createChallengeController = new CreateChallengeController();
const updateChallengeIconController = new UpdateChallengeIconController();
const showChallengeIconController = new ShowChallengeIconController();

challengesRoutes.post("/", createChallengeController.handle);

challengesRoutes.patch(
  "/:id/icon",
  uploadIcon.single("icon"),
  updateChallengeIconController.handle
);

challengesRoutes.get("/:id/icon", showChallengeIconController.handle);

export { challengesRoutes };
