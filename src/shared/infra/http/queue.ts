import "dotenv/config";
import { userChallengeQueue } from "@shared/infra/queue";

import CreateUserChallenge from "../queue/jobs/CreateUserChallenge";

import "@config/cloudnary";

userChallengeQueue.process(async (job, done) => {
  const { time } = job.data;

  try {
    await CreateUserChallenge.handle({
      time,
    });
  } catch (error) {
    console.log(error);
  }

  done();
});
