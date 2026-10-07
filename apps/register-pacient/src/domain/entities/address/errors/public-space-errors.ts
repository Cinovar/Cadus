import type { DomainError } from "../../../errors/domain-error";

export class PublicSpaceError extends Error implements DomainError {
  constructor(textError: string) {
    super(`The publicspace is invalid. ${textError}`);
    this.name = "PublicSpaceError";
  }
}

export class FormatPublicSpaceError extends PublicSpaceError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "FormatPublicSpaceError";
  }
}
