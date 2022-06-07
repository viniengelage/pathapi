import { container } from "tsyringe";

import { ValidationProvider } from "./implementations/ValidationProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<ValidationProvider>(
  "ValidationProvider",
  ValidationProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);
