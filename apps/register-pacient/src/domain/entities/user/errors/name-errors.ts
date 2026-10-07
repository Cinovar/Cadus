import type { DomainError } from "../../../errors/domain-error";

export class NameError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The name is invalid. ${textError}`);
    this.name = "NameError";
  }
}

export class NoFieldExistsNameError extends NameError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "NoFieldExistsNameError";
  }
}

export class FormatNameError extends NameError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "FormatNameError";
  }
}
