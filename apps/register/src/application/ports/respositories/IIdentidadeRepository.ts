import type { Cpf } from "../../../domain/entities/identidade/Cpf";
import type { Email } from "../../../domain/entities/identidade/Email";
import type { Identidade } from "../../../domain/entities/identidade/Identidade";

export interface IIdentidadeRepository {
    add (identidade: Identidade): Promise<void>
    exists (cpf: Cpf): Promise<boolean>
    findIdentidadeByCpf (cpf: Cpf): Promise<Identidade | null>;
    findIdentidadeByEmail (email: Email): Promise<Identidade | null>
    findAllIdentidades (): Promise<Identidade[] | null>
}