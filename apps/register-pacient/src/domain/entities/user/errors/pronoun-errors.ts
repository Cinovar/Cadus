import type { DomainError } from "../../../errors/domain-error";

export class PronounError extends Error implements DomainError {
  constructor(textError: string) {
    super(`Pronoun is invalid. ${textError}`);
    this.name = "PronounError";
  }
}

export class InvalidPronounError extends PronounError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "InvalidPronounError";
  }
}
