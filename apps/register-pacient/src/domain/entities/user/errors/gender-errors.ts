import type { DomainError } from "../../../errors/domain-error";

export class GenderError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The gender is invalid. ${textError}`);
    this.name = "GenderError";
  }
}

export class NoFieldExistsGenderError extends GenderError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "NoFieldExistsGenderError";
  }
}

export class InvalidGenderError extends GenderError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "InvalidGenderError";
  }
}
