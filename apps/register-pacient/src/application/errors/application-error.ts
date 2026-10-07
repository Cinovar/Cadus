import type { DomainError } from "../../domain/errors/domain-error";

export interface ApplicationError extends DomainError {
  code: string;
  message: string;
}
