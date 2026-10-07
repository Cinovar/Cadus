import {
  FormatUserIdError,
  NoFieldExistsUserIdError,
  UserIdError,
} from "./errors/user-id-errors";
import { type Either, success, failure } from "../../../shared/either";
import { ValueObject } from "../../value-objects/value-object ";

export class UserId extends ValueObject<string> {
  constructor(id: string) {
    super(id);
  }

  public static create(id: string): Either<UserIdError, string> {
    if (UserId.noFieldExists(id)) {
      return failure(new NoFieldExistsUserIdError(id));
    }
    if (!UserId.isFormat(id)) {
      return failure(new FormatUserIdError(id));
    }
    return success(id);
  }

  public static noFieldExists(id: string): boolean {
    if (id.length > 0) {
      return false;
    }
    return true;
  }

  public static isFormat(id: string): boolean {
    const regExp: RegExp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!regExp.test(id)) {
      return false;
    }
    return true;
  }

  public static reconstitute(id: string): Either<UserIdError, string> {
    return success(id);
  }

  public get value(): string {
    return this.props;
  }
}
