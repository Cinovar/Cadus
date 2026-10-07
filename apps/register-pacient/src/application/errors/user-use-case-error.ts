import type { ApplicationError } from "./application-error";

export abstract class UserUCError extends Error implements ApplicationError {
    abstract code: string;
    constructor (textError : string) {
        super (`User use case error. ${textError}`);
        this.name = "UserUCError";
    }
}

export class UserAlreadyExistsError extends UserUCError {
    code = "CONFLICT";
    constructor (textError : string){
        super (`${textError}`);
        this.name = "UserAlreadyExistsError";
    }
}

export class UserAdrNotFoundError extends UserUCError {
    code = "RESOURCE_NOT_FOUND";
    constructor (textError : string) {
        super(`${textError}`);
        this.name = "UserAdrNotFoundError";
    }
}

export class CreateUserIdError extends UserUCError {
    code = "BAD_REQUEST";
    constructor (textError : string) {
        super (`${textError}`);
        this.name = "CreateUserIdError";
    }
}

export class CreateUserError extends UserUCError {
    code = "BAD_REQUEST";
    constructor (textError : string) {
        super (`${textError}`);
        this.name = "CreateUserError";
    }
}