import { IValidationProvider } from "../IValidationProvider";

class ValidationProvider implements IValidationProvider {
  validatePhone(phone: string): boolean {
    return true;
  }
}

export { ValidationProvider };
