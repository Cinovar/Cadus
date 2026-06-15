import type { IdentidadeId } from "./IdentidadeId"
import type { Nome } from "./Nome";
import type { Cpf } from "./Cpf";
import type { Data } from "../../shared/value-objects/Data";
import type { Email } from "./Email";
import type { Genero } from "./Genero";
import type { Pronome } from "./Pronome";
import type { Senha } from "./Senha";
import type { Telefone } from "./Telefone";

import type { EnderecoId } from "../endereco/EnderecoId";


// A interface de propriedades para entidade de Identidade não precisa receber um ID
// precisamente, pois é atribuição do sistema daqueles que trabalham com requisições
export interface IdentidadeProps {
    id: IdentidadeId;
    nome: Nome;
    cpf: Cpf;
    dataNascimento: Data;

    genero: Genero;
    pronome?: Pronome;
    
    email: Email;
    telefone: Telefone;
    senha: Senha;
    enderecoId: EnderecoId;

    criadoEm: Data;
    atualizadoEm: Data;
}