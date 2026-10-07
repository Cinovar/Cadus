import type { PresentationError } from "./presentation-errors";

export class ValidationError extends Error implements PresentationError {
  constructor(textError: string) {
    super(`Validation error. ${textError}`);
    this.name = "ValidationError";
  }
}
