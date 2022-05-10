import { ValidationError as ErrorType } from "class-validator";

interface IErros {
  [field: string]: string;
}

export class ValidationError {
  public readonly errors: IErros[];

  constructor(data: ErrorType[]) {
    const listErrors: IErros[] = [];

    data.map((error) =>
      listErrors.push({
        [error.property]: Object.values(error.constraints)[0],
      })
    );

    this.errors = listErrors;
  }
}
