import type { PresentationError } from "./presentation-errors";

export class ServerError extends Error implements PresentationError {
  constructor(reason: string) {
    super(`Server error: ` + reason + `.`);
  }
}
