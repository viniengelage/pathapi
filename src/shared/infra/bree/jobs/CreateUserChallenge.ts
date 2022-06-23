import { workerData } from "worker_threads";

import { userChallengeQueue } from "@shared/infra/queue";

const handle = async () => {
  const { time } = workerData;

  await userChallengeQueue.add({ time });

  process.exit(0);
};

handle();
