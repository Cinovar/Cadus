import { InvalidTelefoneError } from "../errors/InvalidTelefone"
import { type Either, success, failure} from "../../utils/Either"
export class Telefone {
    private readonly telefone: string;

    constructor (telefone: string){
        this.telefone = telefone;
        Object.freeze(this);
    }

    get value (): string {
        return this.telefone;
    }

    static create (telefone: string): Either<InvalidTelefoneError, Telefone> {
        return success (new Telefone(telefone));
    }
}