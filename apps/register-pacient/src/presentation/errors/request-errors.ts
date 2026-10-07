import type { PresentationError } from "./presentation-errors";

export class RequestError extends Error implements PresentationError {
  constructor(textError: string) {
    super(`An error was ocurried with the request. ${textError}`);
    this.name = "RequestError";
  }
}

export class NoBodyRequestError extends RequestError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "NoBodyRequestError";
  }
}

export class MissingParamRequestError extends RequestError {
  constructor(param: string) {
    super(`Missing param: ` + param + `.`);
    this.name = "MissingParamRequestError";
  }
}

export class GenericRequestError extends RequestError {
  constructor(textError: string) {
    super(`${textError}`);
    this.name = "GenericRequestError";
  }
}
