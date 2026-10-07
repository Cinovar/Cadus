import {
  FormatPasswordError,
  NoFieldExistsPasswordError,
  PasswordError,
} from "./errors/password-errors";
import { type Either, success, failure } from "../../../shared/either";

export class Password {
  private readonly _password;

  constructor(password: string) {
    this._password = password;
  }

  public static create(password: string): Either<PasswordError, string> {
    if (Password.noFieldExists(password)) {
      return failure(
        new NoFieldExistsPasswordError("The password don't exists."),
      );
    }
    if (!Password.isFormat(password)) {
      return failure(
        new FormatPasswordError(
          "The password length is greater than 60 digits.",
        ),
      );
    }
    return success(password);
  }

  public static noFieldExists(Password: string): boolean {
    if (Password.length > 0) {
      return false;
    }
    return true;
  }

  public static isFormat(Password: string): boolean {
    if (Password.length !== 60) {
      return false;
    }
    return true;
  }

  public get value(): string {
    return this._password;
  }
}
