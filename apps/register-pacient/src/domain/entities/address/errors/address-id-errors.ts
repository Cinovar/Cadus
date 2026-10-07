import type { DomainError } from "../../../errors/domain-error";

export class AddressIdError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The userId is invalid. ${textError}`);
    this.name = "UserIdError";
  }
}

export class ReconstituteAddressIdError extends AddressIdError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "ReconstituteAddressIdError";
  }
}

export class NoFieldExistsAddressIdError extends AddressIdError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "NoFieldExistsAddressIdError";
  }
}

export class FormatAddressIdError extends AddressIdError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "FormatAddressIdError";
  }
}
