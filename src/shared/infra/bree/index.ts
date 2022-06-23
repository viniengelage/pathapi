import Bree from "bree";
import path from "path";

const bree = new Bree({
  root: path.join(__dirname, "jobs"),
  defaultExtension: "ts",
  jobs: [
    {
      name: "CreateUserChallenge",
      cron: "0 0 */1 * * *",
      worker: {
        workerData: {
          time: new Date(),
        },
      },
    },
  ],
});

export { bree };
