// Validation
import { z } from "zod";
// Shared
import { type Either, failure, success } from "../../shared/either";
// Errors
import { ValidationError } from "../errors/validation-errors";

export interface IValidator<T> {
  validate(data: any): Either<ValidationError, T>;
}

export class Zodvalidator<T> implements IValidator<T> {
  private readonly _zodSchema: z.ZodType<T>;

  constructor(zodSchema: z.ZodType<T>) {
    this._zodSchema = zodSchema;
  }

  validate(data: any): Either<ValidationError, T> {
    const result = this._zodSchema.safeParse(data);

    if (!result.success) {
      const treeError = z.treeifyError(result.error);
      return failure(new ValidationError(JSON.stringify(treeError)));
    }

    return success(result.data);
  }
}
