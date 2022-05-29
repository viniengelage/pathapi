import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateChallengeController } from "@modules/challenges/useCases/createChallenge/CreateChallengeController";
import { ListChallengesController } from "@modules/challenges/useCases/listChallenges/ListChallengesController";
import { ShowChallengeController } from "@modules/challenges/useCases/showChallenge/ShowChallengeController";
import { ShowChallengeIconController } from "@modules/challenges/useCases/showChallengeIcon/ShowChallengeIconController";
import { UpdateChallengeController } from "@modules/challenges/useCases/updateChallenge/UpdateChallengeController";
import { UpdateChallengeIconController } from "@modules/challenges/useCases/updateChallengeIcon/UpdateChallengeController";

const challengesRoutes = Router();

const uploadIcon = multer(uploadConfig.upload("./tmp/icons"));

const createChallengeController = new CreateChallengeController();
const updateChallengeIconController = new UpdateChallengeIconController();
const showChallengeIconController = new ShowChallengeIconController();
const updateChallengeController = new UpdateChallengeController();
const listChallengesController = new ListChallengesController();
const showChallengeController = new ShowChallengeController();

challengesRoutes.post("/", createChallengeController.handle);
challengesRoutes.get("/", listChallengesController.handle);
challengesRoutes.get("/:id", showChallengeController.handle);
challengesRoutes.put("/:id", updateChallengeController.handle);

challengesRoutes.patch(
  "/:id/icon",
  uploadIcon.single("icon"),
  updateChallengeIconController.handle
);

challengesRoutes.get("/:id/icon", showChallengeIconController.handle);

export { challengesRoutes };
