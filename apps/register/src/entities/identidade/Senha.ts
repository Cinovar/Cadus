import { InvalidSenhaError } from "../errors/InvalidSenha"
import { type Either, success, failure} from "../../utils/Either"
export class Senha {
    private readonly senha;
    constructor (senha: string) {
        this.senha = senha;
        Object.freeze(this);
    }

    get value (): string {
        return this.senha;
    }

    static create (senha: string): Either<InvalidSenhaError, Senha> {
        return success(new Senha(senha));
    }
}