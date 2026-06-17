import type { IdentidadeProps } from "../../domain/entities/identidade/IdentidadeProps";

export interface IIdentidadeRepository {
    add (identidade: IdentidadeProps): Promise<void>
    exists (email: string): Promise<boolean>
    findIdentidadeByEmail (email: string): Promise<IdentidadeProps>
    findAllIdentidades (): Promise<IdentidadeProps[]>
}