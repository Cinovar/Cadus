import type { DomainError } from "../../../errors/domain-error";

export class PasswordError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The password is invalid. ${textError}`);
    this.name = "PasswordError";
  }
}

export class NoFieldExistsPasswordError extends PasswordError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "NoFieldExistsPasswordError";
  }
}

export class FormatPasswordError extends PasswordError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "FormatPasswordError";
  }
}
