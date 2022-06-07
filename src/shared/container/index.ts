import { container } from "tsyringe";

import "@shared/container/providers";

import { ActivitiesCategoriesRepository } from "@modules/activities/infra/typeorm/repositories/ActivitiesCategoriesRepository";
import { ActivitiesRepository } from "@modules/activities/infra/typeorm/repositories/ActivitiesRepository";
import { IActivitiesCategoriesRepository } from "@modules/activities/repositories/IActivitiesCategoriesRepository";
import { IActivitiesRepository } from "@modules/activities/repositories/IActivitiesRepository";
import { ChallengesRepository } from "@modules/challenges/infra/typeorm/repositories/ChallengesRepository";
import { UserChallengesRepository } from "@modules/challenges/infra/typeorm/repositories/UserChallengesRepository";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { IUserChallengesRepository } from "@modules/challenges/repositories/IUserChallengesRepository";
import { UsersTokensRepository } from "@modules/users/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";

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

container.registerSingleton<IChallengesRepository>(
  "ChallengesRepository",
  ChallengesRepository
);

container.registerSingleton<IUserChallengesRepository>(
  "UserChallengesRepository",
  UserChallengesRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
