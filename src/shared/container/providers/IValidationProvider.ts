export interface IValidationProvider {
  validatePhone(phone: string): boolean;
  validateEmail(email: string): Promise<boolean>;
}
