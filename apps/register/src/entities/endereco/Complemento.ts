import { InvalidComplementoError } from "../errors/InvalidComplemento";
import { type Either, success, failure } from "../../utils/Either";

export class Complemento {
    private _complemento: string;
    constructor (complemento: string) {
        this._complemento = complemento;
    }

    public static create (complemento: string): Either<InvalidComplementoError, Complemento> {
        return success(new Complemento(complemento));
    }
}