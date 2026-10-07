import type { DomainError } from "./domain-error";

export class DateError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The date is invalid. ${textError}`);
    this.name = "DateError";
  }
}

export class NoFieldExistsDateError extends DateError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "NoFieldExistsDate";
  }
}

export class FormatDateError extends DateError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "FormatDatError";
  }
}
