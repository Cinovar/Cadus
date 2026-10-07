import type { DomainAddressError } from "../../../errors/entity-errors";

export class AddressError extends Error implements DomainAddressError {
  constructor(textError: string) {
    super(`The address is invalid. ${textError}`);
    this.name = "AddressError";
  }
}

export class AddressCreateError extends AddressError {
  constructor(textError : string) {
    super (`${textError}`);
    this.name = "AddressCreateError";
  }
}

export class AddressReconstituteError extends AddressError {
  constructor(textError : string) {
    super (`${textError}`);
    this.name = "AddressReconstituteError";
  }
}