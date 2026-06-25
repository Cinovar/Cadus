import type { IdentidadeId } from "./IdentidadeId"
import type { Nome } from "./Nome";
import type { Cpf } from "./Cpf";
import type { Data } from "../../../shared/value-objects/Data";
import type { Email } from "./Email";
import type { Genero } from "./Genero";
import type { Pronome } from "./Pronome";
import type { Senha } from "./Senha";
import type { Telefone } from "./Telefone";
import type { EnderecoId } from "../endereco/EnderecoId";

export interface IdentidadeProps {
    nome: Nome;
    cpf: Cpf;
    dataNascimento: Data;

    genero: Genero;
    pronome?: Pronome;

    email: Email;
    telefone: Telefone;
    senha: Senha;
    enderecoId: EnderecoId;

    // String puro — queixa não tem regras de domínio além do maxLength
    // que já é garantido pelo campo no banco (VarChar 2000)
    queixa?: string;
}