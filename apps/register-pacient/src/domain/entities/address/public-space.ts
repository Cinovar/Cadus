import {
  PublicSpaceError,
  FormatPublicSpaceError,
} from "./errors/public-space-errors";
import { type Either, success, failure } from "../../../shared/either";

export class PublicSpace {
  private _publicSpace: string | undefined;
  constructor(publicSpace: string | undefined) {
    this._publicSpace = publicSpace;
  }

  public static create(
    publicSpace: string | undefined,
  ): Either<PublicSpaceError, string | undefined> {
    if (!publicSpace) return success(publicSpace);

    if (!PublicSpace.isFormat(publicSpace))
      return failure(
        new FormatPublicSpaceError(
          "The punlic space is greater than 200 digits.",
        ),
      );

    return success(publicSpace);
  }

  public static isFormat(publicSpace: string): boolean {
    if (publicSpace.length > 200) return false;
    return true;
  }

  public get value(): string | undefined {
    return this._publicSpace;
  }
}
