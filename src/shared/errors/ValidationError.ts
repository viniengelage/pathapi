interface IErros {
  [field: string]: string;
}

export class ValidationError {
  public readonly errors: IErros[];
  public readonly statusCode: number;

  constructor(errors: IErros[], code = 422) {
    this.errors = errors;
    this.statusCode = code;
  }
}
