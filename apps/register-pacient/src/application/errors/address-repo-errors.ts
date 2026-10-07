import type { ApplicationError } from "./application-error";

export abstract class AddressRepoError
  extends Error
  implements ApplicationError
{
  abstract readonly code: string;
  constructor(textError: string) {
    super(`An error of address repository was ocurred. ${textError}`);
    this.name = "AddressRepoError";
  }
}

export class AddAddressRepoError extends AddressRepoError {
  readonly code = "BAD_REQUEST";

  constructor(textError: string) {
    super(`${textError}`);
    this.name = "AddAddressRepoError";
  }
}

export class ExistsAddressRepoError extends AddressRepoError {
  readonly code = "CONFLICT";

  constructor(textError: string) {
    super(`${textError}`);
    this.name = "ExistsAddressRepoError";
  }
}

export class FindAddressRepoError extends AddressRepoError {
  readonly code = "RESOURCE_NOT_FOUND";

  constructor(textError: string) {
    super(`${textError}`);
    this.name = "FindAddressRepoError";
  }
}
