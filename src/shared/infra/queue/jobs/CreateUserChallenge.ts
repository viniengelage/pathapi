import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { map } from "modern-async";
import { getConnection, getConnectionManager } from "typeorm";

import { ChallengesRepository } from "@modules/challenges/infra/typeorm/repositories/ChallengesRepository";
import { UserChallengesRepository } from "@modules/challenges/infra/typeorm/repositories/UserChallengesRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { ExpoNotificationProvider } from "@shared/container/providers/NotificationProvider/implementations/ExpoNotificationProvider";
import createConnection from "@shared/infra/typeorm";

dayjs.extend(utc);
dayjs.extend(timezone);

interface IRequest {
  time: Date;
}

export default {
  key: "CreateUserChallengeBull",
  async handle({ time }: IRequest) {
    const hour = dayjs(time)
      .tz("America/Sao_Paulo")
      .set("minute", 0)
      .format("HH:mm");

    const timeMore59minutes = dayjs(time)
      .tz("America/Sao_Paulo")
      .set("minute", 59)
      .format("HH:mm");

    const connection = getConnectionManager();

    if (!connection.has("default")) {
      await createConnection();
    }

    const usersRespository = new UsersRepository();
    const userChallengesRepository = new UserChallengesRepository();
    const challengesRepository = new ChallengesRepository();
    const notificationProvider = new ExpoNotificationProvider();

    const users = await usersRespository.findByFreeTime(
      hour,
      timeMore59minutes
    );

    await map(users, async (user) => {
      const hasIncompletedChallenge =
        await userChallengesRepository.findIncompletedChallenge(user.id);

      if (hasIncompletedChallenge) {
        return;
      }

      const userLastedCompletedLevel =
        await userChallengesRepository.findByLastedCompletedLevel(user.id);

      if (!userLastedCompletedLevel) {
        const level1Challenge = await challengesRepository.findByLevel(1);

        if (level1Challenge) {
          await userChallengesRepository.create({
            user_id: user.id,
            challenge_id: level1Challenge.id,
          });
        }
      } else {
        const nextLevel = await challengesRepository.findNextLevel(
          userLastedCompletedLevel.challenge.level
        );

        await userChallengesRepository.create({
          user_id: user.id,
          challenge_id: nextLevel.id,
        });

        if (user.push_token) {
          await notificationProvider.send({
            to: user.push_token,
            title: "Novo desafio",
            body: "Tem um novo desafio a sua espera",
          });
        }
      }
    });

    // const connection = getConnection();

    // await connection.close();
  },
};
