import {
  ComplementError,
  FormatComplementError,
} from "./errors/complement-errors";
import { type Either, success, failure } from "../../../shared/either";

export class Complement {
  private _complement: string | undefined;
  constructor(complement: string | undefined) {
    this._complement = complement;
  }

  public static create(
    complement: string | undefined,
  ): Either<ComplementError, string | undefined> {
    if (!complement) {
      return success(complement);
    }

    if (!Complement.isFormat(complement)) {
      return failure(
        new FormatComplementError(
          "The complement text is greater than 200 digits.",
        ),
      );
    }
    return success(complement);
  }

  public static isFormat(complement: string): boolean {
    if (complement.length > 200) {
      return false;
    }
    return true;
  }

  public get value() {
    return this._complement;
  }
}
