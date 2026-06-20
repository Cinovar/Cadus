import { InvalidLogradouroError } from "../../errors/InvalidLogradouro";
import { type Either, success, failure } from "../../../shared/Either";

export class Logradouro {
    private _logradouro: string | undefined;
    constructor (logradouro: string | undefined) {
        this._logradouro = logradouro;
    }

    public static create (logradouro: string | undefined): Either<InvalidLogradouroError, Logradouro> {

        return success(new Logradouro(logradouro));
    }

    public get value (): string | undefined {
        return this._logradouro;
    }
} 