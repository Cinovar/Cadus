import { InvalidCepError } from "../errors/InvalidCep";
import { type Either, success, failure } from "../../shared/Either";

export class Cep {
    private _cep: string;
    constructor (cep: string){
        this._cep = cep;
    }

    public static create (cep: string): Either<InvalidCepError, Cep> {
        if (Cep.noFieldExists(cep)){
            return failure(new InvalidCepError(cep));
        }
        if (!Cep.isCorrectFormat(cep)) {
            return failure(new InvalidCepError(cep));
        }
        return success(new Cep(cep));
    }

    public static noFieldExists (cep: string): boolean {
        if (cep.length > 0) {
            return false;
        }
        return true;
    }

    public static isCorrectFormat (cep: string): boolean {
        const regExp: RegExp = /^[0-9]{5}[-][0-9]{3}$/;
        if (!regExp.test(cep)){
            return false;
        }
        return true;
    }

    public get value (): string {
        return this._cep;
    }
}