import { container } from "tsyringe";

import { ValidationProvider } from "./implementations/ValidationProvider";

container.registerSingleton<ValidationProvider>(
  "ValidationProvider",
  ValidationProvider
);
