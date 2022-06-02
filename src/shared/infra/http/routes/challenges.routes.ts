import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CompleteUserChallengeController } from "@modules/challenges/useCases/completeUserChallenge/CompleteUserChallengeController";
import { CreateChallengeController } from "@modules/challenges/useCases/createChallenge/CreateChallengeController";
import { CreateUserChallengeController } from "@modules/challenges/useCases/createUserChallenge/CreateUserChallengeController";
import { DeleteChallengeController } from "@modules/challenges/useCases/deleteChallenge/DeleteChallengeController";
import { DeleteUserChallengeController } from "@modules/challenges/useCases/deleteUserChallenge/DeleteUserController";
import { ListChallengesController } from "@modules/challenges/useCases/listChallenges/ListChallengesController";
import { ListChallengesByUserController } from "@modules/challenges/useCases/listChallengesByUser/ListChallengesByUserController";
import { ShowChallengeController } from "@modules/challenges/useCases/showChallenge/ShowChallengeController";
import { ShowChallengeIconController } from "@modules/challenges/useCases/showChallengeIcon/ShowChallengeIconController";
import { UpdateChallengeController } from "@modules/challenges/useCases/updateChallenge/UpdateChallengeController";
import { UpdateChallengeIconController } from "@modules/challenges/useCases/updateChallengeIcon/UpdateChallengeController";
import { ensureAuthenticated } from "@shared/infra/middlewares/ensureAuthenticated";
import { is } from "@shared/infra/middlewares/permission";

const challengesRoutes = Router();

const uploadIcon = multer(uploadConfig.upload("./tmp/icons"));

const createChallengeController = new CreateChallengeController();
const updateChallengeIconController = new UpdateChallengeIconController();
const showChallengeIconController = new ShowChallengeIconController();
const updateChallengeController = new UpdateChallengeController();
const listChallengesController = new ListChallengesController();
const showChallengeController = new ShowChallengeController();
const deleteChallengeController = new DeleteChallengeController();

const createUserChallengeController = new CreateUserChallengeController();
const listChallengesByUser = new ListChallengesByUserController();

const completeUserChallengeController = new CompleteUserChallengeController();
const deleteteUserChallengeController = new DeleteUserChallengeController();

challengesRoutes.use(ensureAuthenticated);

challengesRoutes.post(
  "/users/:id",
  is("admin"),
  createUserChallengeController.handle
);
challengesRoutes.get("/users/me", is("customer"), listChallengesByUser.handle);
challengesRoutes.delete(
  "/users/challenges/:id/delete",
  is("admin"),
  deleteteUserChallengeController.handle
);
challengesRoutes.patch(
  "/:id/finalize",
  is("customer"),
  completeUserChallengeController.handle
);

challengesRoutes.post("/", is("admin"), createChallengeController.handle);
challengesRoutes.get("/", is("admin"), listChallengesController.handle);
challengesRoutes.get("/:id", is("admin"), showChallengeController.handle);
challengesRoutes.put("/:id", is("admin"), updateChallengeController.handle);
challengesRoutes.delete("/:id", is("admin"), deleteChallengeController.handle);

challengesRoutes.patch(
  "/:id/icon",
  is("admin"),
  uploadIcon.single("icon"),
  updateChallengeIconController.handle
);

challengesRoutes.get(
  "/:id/icon",
  is("admin"),
  showChallengeIconController.handle
);

export { challengesRoutes };
