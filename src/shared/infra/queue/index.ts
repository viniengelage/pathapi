import "dotenv/config";
import Queue from "bull";

import redisConfig from "@config/redis";

import CreateUserChallenge from "./jobs/CreateUserChallenge";

const userChallengeQueue = new Queue(CreateUserChallenge.key, {
  redis: redisConfig,
});

userChallengeQueue.on("failed", (error) => console.log("falhou", error));
userChallengeQueue.on("error", (error) => console.log("Error", error));
userChallengeQueue.on("active", () => console.log("iniciou"));
userChallengeQueue.on("completed", (job) =>
  console.log(`Job complete with id ${job.id}`)
);

export { userChallengeQueue };
