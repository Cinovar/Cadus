import { InvalidLogradouroError } from "../../errors/InvalidLogradouro";
import { type Either, success, failure } from "../../../shared/Either";

export class Logradouro {
    private _logradouro: string;
    constructor (logradouro: string) {
        this._logradouro = logradouro;
    }

    public static create (logradouro: string): Either<InvalidLogradouroError, Logradouro> {
        if (Logradouro.noFieldExist(logradouro)) {
            return failure(new InvalidLogradouroError(logradouro));
        }
        return success(new Logradouro(logradouro));
    }

    public static noFieldExist (logradouro: string): boolean {
        if (logradouro.length > 0) {
            return false;
        }
        return true;
    }

    public get value (): string {
        return this._logradouro;
    }
} 