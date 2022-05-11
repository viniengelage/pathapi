import * as Yup from "yup";

import phoneValidation from "@utils/validators/phone";

import { IValidationProvider } from "../IValidationProvider";

class ValidationProvider implements IValidationProvider {
  validatePhone(phone: string): boolean {
    const isValidPhone = phoneValidation(phone);

    return isValidPhone;
  }

  async validateEmail(email: string): Promise<boolean> {
    try {
      await Yup.string().email().required().validate(email);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export { ValidationProvider };
