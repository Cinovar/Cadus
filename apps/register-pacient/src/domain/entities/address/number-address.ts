import {
  NegativeNumberAddressError,
  NumberAddressError,
} from "./errors/number-address-errors";
import { type Either, success, failure } from "../../../shared/either";

export class NumberAddress {
  private _numberAddress: number;
  constructor(numberAddress: number) {
    this._numberAddress = numberAddress;
  }

  public static create(
    numberAddress: number,
  ): Either<NumberAddressError, number> {
    if (!NumberAddress.isNoNegativeNumber(numberAddress)) {
      return failure(new NegativeNumberAddressError(numberAddress.toString()));
    }
    return success(numberAddress);
  }

  public static isNoNegativeNumber(numberAddress: number): boolean {
    if (numberAddress < 0) {
      return false;
    }
    return true;
  }

  public get value(): number {
    return this._numberAddress;
  }
}
