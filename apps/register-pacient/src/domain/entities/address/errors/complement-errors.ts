import type { DomainError } from "../../../errors/domain-error";

export class ComplementError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The complement is invalid. ${textError}`);
    this.name = "ComplementError";
  }
}

export class FormatComplementError extends ComplementError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "FormatComplementError";
  }
}
