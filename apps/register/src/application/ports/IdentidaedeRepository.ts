import type { Cpf } from "../../domain/entities/identidade/Cpf";
import type { Email } from "../../domain/entities/identidade/Email";
import type { IdentidadeProps } from "../../domain/entities/identidade/IdentidadeProps";

export interface IIdentidadeRepository {
    add (identidade: IdentidadeProps): Promise<void>
    exists (cpf: Cpf): Promise<boolean>
    findIdentidadeByEmail (email: Email): Promise<IdentidadeProps>
    findAllIdentidades (): Promise<IdentidadeProps[]>
}