import "dotenv/config";
import { userChallengeQueue } from "@shared/infra/queue";

import CreateUserChallenge from "../queue/jobs/CreateUserChallenge";

userChallengeQueue.process((job, done) => {
  const { time } = job.data;

  CreateUserChallenge.handle({
    time,
  });

  done();
});
