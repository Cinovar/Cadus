import type { DomainError } from "../../../errors/domain-error";

export class TelephoneError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The telephone is invalid. ${textError}`);
    this.name = "TelephoneError";
  }
}

export class NoFieldExistsTelephone extends TelephoneError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "NoFieldExistsTelephone";
  }
}

export class IsNotFormatTelephone extends TelephoneError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "IsNotFormatTelephone";
  }
}
