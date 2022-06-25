import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { ValidationProvider } from "./implementations/ValidationProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { GoogleMailProvider } from "./MailProvider/implementations/GoogleMailProvider";
import { ExpoNotificationProvider } from "./NotificationProvider/implementations/ExpoNotificationProvider";
import { INotificationProvider } from "./NotificationProvider/INotificationProvider";

container.registerSingleton<ValidationProvider>(
  "ValidationProvider",
  ValidationProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerInstance<IMailProvider>(
  "GoogleMailProvider",
  new GoogleMailProvider()
);

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerSingleton<INotificationProvider>(
  "ExpoNotificationProvider",
  ExpoNotificationProvider
);
