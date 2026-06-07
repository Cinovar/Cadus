import { InvalidNumeroError } from "../errors/InvalidNumero";
import { type Either, success, failure } from "../../utils/Either";

export class Numero {
    private _numero: number;
    constructor (numero: number) {
        this._numero = numero;
    }

    public static create (numero: number): Either<InvalidNumeroError, Numero> {
        return success(new Numero(numero));
    }
}