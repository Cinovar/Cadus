import type { DomainError } from "../../../errors/domain-error";

export class ZipCodeError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The zipcode is invalid. ${textError}`);
    this.name = "ZipCodeError";
  }
}

export class NoFieldExistsZipCodeEror extends ZipCodeError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "NoFieldExistsZipCodeError";
  }
}

export class FormatZipCodeError extends ZipCodeError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "FormatZipCodeError";
  }
}
