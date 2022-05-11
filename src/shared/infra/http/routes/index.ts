import { Router } from "express";

import { authRoutes } from "./auth.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/auth", authRoutes);

export { router };
