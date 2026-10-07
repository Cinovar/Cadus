import {
  TelephoneError,
  NoFieldExistsTelephone,
  IsNotFormatTelephone,
} from "./errors/telephone-errors";
import { type Either, success, failure } from "../../../shared/either";

export class Telephone {
  private readonly _telephone: string;

  constructor(Telephone: string) {
    this._telephone = Telephone;
  }

  public static create(telephone: string): Either<TelephoneError, string> {
    if (Telephone.noFieldExists(telephone)) {
      return failure(new NoFieldExistsTelephone(telephone));
    }
    if (!Telephone.isFormat(telephone)) {
      return failure(new IsNotFormatTelephone(telephone));
    }
    return success(telephone);
  }

  public static noFieldExists(Telephone: string): boolean {
    if (Telephone.length > 0) {
      return false;
    }
    return true;
  }

  public static isFormat(Telephone: string): boolean {
    const regExp: RegExp = /^(\()?[0-9]{2}(\))?[\s]?[0-9]{4,5}[-]?[0-9]{4}$/;
    if (!regExp.test(Telephone)) {
      return false;
    }
    return true;
  }

  public get value(): string {
    return this._telephone;
  }
}
