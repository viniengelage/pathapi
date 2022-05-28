import { Router } from "express";

import { activitiesRoutes } from "./activities.routes";
import { authRoutes } from "./auth.routes";
import { challengesRoutes } from "./challenges.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/auth", authRoutes);
router.use("/activities", activitiesRoutes);
router.use("/challenges", challengesRoutes);

export { router };
