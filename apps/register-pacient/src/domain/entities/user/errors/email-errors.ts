import type { DomainError } from "../../../errors/domain-error";

export class EmailError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The email is invalid. ${textError}`);
    this.name = "EmailError";
  }
}
