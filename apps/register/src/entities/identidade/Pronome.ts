import { InvalidPronomeError } from "../errors/InvalidPronome"
import { type Either, success, failure } from "../../utils/Either"

export class Pronome {
    private readonly _pronome: string;
    constructor (pronome: string) {
        this._pronome = pronome;
        Object.freeze(this);
    }

    public static create (pronome: string): Either<InvalidPronomeError, Pronome> {


        return success(new Pronome(pronome));
    }

    public get value (): string {
        return this._pronome;
    }
}