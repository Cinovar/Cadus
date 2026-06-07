import { InvalidLogradouroError } from "../errors/InvalidLogradouro";
import { type Either, success, failure } from "../../utils/Either";

export class Logradouro {
    private _logradouro: string;
    constructor (logradouro: string) {
        this._logradouro = logradouro;
    }

    public static create (logradouro: string): Either<InvalidLogradouroError, Logradouro> {
        return success(new Logradouro(logradouro));
    }
} 