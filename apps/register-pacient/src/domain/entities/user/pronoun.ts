import { InvalidPronounError, PronounError } from "./errors/pronoun-errors";
import { type Either, success, failure } from "../../../shared/either";
import { PronounEnum } from "./enums/pronoun-enum";

export class Pronoun {
  private readonly _pronoun: string;
  constructor(pronoun: string) {
    this._pronoun = pronoun;
  }

  public static create(pronoun: string): Either<PronounError, string> {
    if (!Pronoun.validation(pronoun)) {
      return failure(new InvalidPronounError(pronoun));
    }
    return success(pronoun);
  }

  public static validation(Pronoun: string) {
    if (!(Pronoun in PronounEnum)) return false;
    return true;
  }

  public get value(): string {
    return this._pronoun;
  }
}
