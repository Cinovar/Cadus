import type { DomainUserError } from "../../../errors/entity-errors";

export class UserError extends Error implements DomainUserError {
    constructor (textError : string) {
        super (`User domain error. ${textError}`);
        this.name = "UserError";
    }
}

export class UserCreateError extends UserError {
    constructor (textError : string) {
        super (`${textError}`);
        this.name = "UserCreateError";
    }
}

export class UserReconstituteError extends UserError {
    constructor (textError : string) {
        super(`${textError}`);
        this.name = "UserReconstituteError";
    }
}