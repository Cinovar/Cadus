import { InvalidCepError } from "../errors/InvalidCep";
import { type Either, success, failure } from "../../utils/Either";

export class Cep {
    private _cep: string;
    constructor (cep: string){
        this._cep = cep;
    }

    public static create (cep: string): Either<InvalidCepError, Cep> {
        return success(new Cep(cep));
    }
}