import { container } from "tsyringe";

import "@shared/container/providers";

import { ActivitiesCategoriesRepository } from "@modules/activities/infra/typeorm/repositories/ActivitiesCategoriesRepository";
import { ActivitiesRepository } from "@modules/activities/infra/typeorm/repositories/ActivitiesRepository";
import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";
import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";

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

container.registerSingleton<IActivitiesRepository>(
  "ActivitiesRepository",
  ActivitiesRepository
);
