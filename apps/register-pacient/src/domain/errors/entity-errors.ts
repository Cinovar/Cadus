import type { DomainError } from "./domain-error";

export abstract class DomainEntityError extends Error implements DomainError {
  constructor(textError: string) {
    super(`Domain entity error. ${textError}`);
    this.name = "EntityError";
  }
}

export class DomainUserError extends DomainEntityError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "DomainUserError";
  }
}

export class DomainAddressError extends DomainEntityError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "DomainAddressError";
  }
}
