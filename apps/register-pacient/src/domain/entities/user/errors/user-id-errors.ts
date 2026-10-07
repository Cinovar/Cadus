import type { DomainError } from "../../../errors/domain-error";

export class UserIdError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The userId is invalid. ${textError}`);
    this.name = "UserIdError";
  }
}

export class NoFieldExistsUserIdError extends UserIdError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "NoFieldExistsUserIdError";
  }
}

export class FormatUserIdError extends UserIdError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "FormatUserIdError";
  }
}
