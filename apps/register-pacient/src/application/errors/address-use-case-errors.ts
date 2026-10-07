import type { ApplicationError } from "./application-error";

export abstract class AddressUCError extends Error implements ApplicationError {
  abstract readonly code: string;
  constructor(textError: string) {
    super(`Address use case error. ${textError}`);
    this.name = "AddressUCError";
  }
}

export class CreateAddressIdError extends AddressUCError {
  code = "BAD_REQUEST";
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "CreateAddressIdError";
  }
}

export class CreateAddressError extends AddressUCError {
  code = "BAD_REQUEST";
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "CreateAddressError";
  }
}
