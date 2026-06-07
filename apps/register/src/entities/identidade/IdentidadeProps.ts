import type { Id } from "./Id"
import type { Nome } from "./Nome";
import type { Cpf } from "./Cpf";
import type { Data } from "./Data";
import type { Email } from "./Email";
import type { Genero } from "./Genero";
import type { Pronome } from "./Pronome";
import type { Senha } from "./Senha";
import type { Telefone } from "./Telefone";


// A interface de propriedades para entidade de Identidade não precisa receber um ID
// precisamente, pois é atribuição do sistema daqueles que trabalham com requisições
export interface IdentidadeProps {
    id: Id;
    nome: Nome;
    cpf: Cpf;
    dataNascimento: Data;

    genero: Genero;
    pronome?: Pronome;
    
    email: Email;
    telefone: Telefone;
    senha: Senha;
    enderecoId: Id;

    criadoEm: Data;
    atualizadoEm: Data;
}