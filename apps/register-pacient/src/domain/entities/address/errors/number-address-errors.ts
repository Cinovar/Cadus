import type { DomainError } from "../../../errors/domain-error";

export class NumberAddressError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The number address is invalid. ${textError}`);
    this.name = "NumberAddressError";
  }
}

export class NegativeNumberAddressError extends NumberAddressError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "NegativeNumberAddressError";
  }
}
