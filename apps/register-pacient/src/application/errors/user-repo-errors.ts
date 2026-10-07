import type { ApplicationError } from "./application-error";

export abstract class UserRepoError extends Error implements ApplicationError {
  abstract readonly code: string;
  constructor(textError: string) {
    super(`An error of user repository was ocurred. ${textError}`);
    this.name = "UserRepoError";
  }
}

export class AddUserRepoError extends UserRepoError {
  code = "BAD_REQUEST";
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "AddUserRepoError";
  }
}

export class ExistsUserRepoError extends UserRepoError {
  code = "CONFLICT";
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "ExistsUserRepoError";
  }
}

export class FindUserRepoError extends UserRepoError {
  code = "RESOURCE_NOT_FOUND";
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "FindUserRepoError";
  }
}
