import { ValidationError } from "yup";

export default function getValidationErrors(errors: ValidationError) {
  const validationErrors = {};

  errors.inner.forEach((err) => {
    validationErrors[err.path] = err.message;
  });

  return validationErrors;
}
