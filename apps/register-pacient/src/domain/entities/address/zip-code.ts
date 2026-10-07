import {
  FormatZipCodeError,
  NoFieldExistsZipCodeEror,
  ZipCodeError,
} from "./errors/zip-code-errors";
import { type Either, success, failure } from "../../../shared/either";

export class ZipCode {
  private _zipCode: string;

  constructor(zipCode: string) {
    this._zipCode = zipCode;
  }

  public static create(zipCode: string): Either<ZipCodeError, string> {
    if (ZipCode.noFieldExists(zipCode)) {
      return failure(
        new NoFieldExistsZipCodeEror("The zipcode field is empty."),
      );
    }
    if (!ZipCode.isFormat(zipCode)) {
      return failure(new FormatZipCodeError(zipCode));
    }
    return success(zipCode);
  }

  public static noFieldExists(zipCode: string): boolean {
    if (zipCode.length > 0) {
      return false;
    }
    return true;
  }

  public static isFormat(zipCode: string): boolean {
    // Verify num digits of the zipCode
    if (zipCode.length !== 8) {
      return false;
    }
    return true;
  }
  public get value(): string {
    return this._zipCode;
  }
  public set value(zipCode: string) {
    this._zipCode = zipCode;
  }
}
