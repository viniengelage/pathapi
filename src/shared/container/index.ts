import { container } from "tsyringe";

import "@shared/container/providers";

import { ActivitiesCategoriesRepository } from "@modules/activities/infra/typeorm/repositories/ActivitiesCategoriesRepository";
import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";

import { UsersRepository } from "../../modules/users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IActivitiesCategoriesRepository>(
  "ActivitiesCategoriesRepository",
  ActivitiesCategoriesRepository
);
