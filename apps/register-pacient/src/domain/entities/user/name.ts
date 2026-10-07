import {
  FormatNameError,
  NameError,
  NoFieldExistsNameError,
} from "./errors/name-errors";
import { type Either, success, failure } from "../../../shared/either";

export class Name {
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  public static create(name: string): Either<NameError, string> {
    if (Name.noFieldexists(name)) {
      return failure(new NoFieldExistsNameError(name));
    }
    if (!Name.isFormat(name)) {
      return failure(new FormatNameError(name));
    }
    return success(name);
  }

  public static noFieldexists(name: string): boolean {
    if (name.length > 0) {
      return false;
    }
    return true;
  }

  public static isFormat(name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 255) {
      return false;
    }
    return true;
  }

  public get value(): string {
    return this._name;
  }
}
