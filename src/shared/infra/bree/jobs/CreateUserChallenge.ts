import { workerData } from "worker_threads";

import { userChallengeQueue } from "@shared/infra/queue";

const handle = async () => {
  const { time } = workerData;

  userChallengeQueue.add({ time }).then(() => process.exit(0));
};

handle();
