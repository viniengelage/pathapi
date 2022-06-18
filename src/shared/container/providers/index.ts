import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { ValidationProvider } from "./implementations/ValidationProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
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

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerSingleton<INotificationProvider>(
  "ExpoNotificationProvider",
  ExpoNotificationProvider
);
