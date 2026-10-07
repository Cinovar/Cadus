import {
  GenderError,
  InvalidGenderError,
  NoFieldExistsGenderError,
} from "./errors/gender-errors";
import { type Either, success, failure } from "../../../shared/either";
import type { GenderEnum } from "./enums/gender-enum";

export class Gender {
  private readonly _gender: string;
  constructor(gender: string) {
    this._gender = gender;
  }

  public static create(gender: string): Either<GenderError, string> {
    if (Gender.noFieldExistsGeneroError(gender)) {
      return failure(
        new NoFieldExistsGenderError("The gender field is empty."),
      );
    }
    if (!Gender.noFormatGeneroError(gender)) {
      return failure(new InvalidGenderError(gender));
    }

    return success(gender);
  }

  public static noFormatGeneroError(gender: string): boolean {
    const normalizedGender: string = gender.toUpperCase();

    if (!(normalizedGender in GenderEnum)) return false;
    return true;
  }

  public static noFieldExistsGeneroError(gender: string): boolean {
    if (gender.length > 0) return false;
    return true;
  }

  public get value(): string {
    return this._gender;
  }
}
