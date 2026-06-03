import { Nome } from "./Name";
import { Cpf } from "./Cpf";
import { DataNascimento } from "./DataNascimento";
import { Email } from "./Email";
import { Genero } from "./Genero";
import { Pronome } from "./Pronome";
import { Senha } from "./Senha";
import { Telefone } from "./Telefone";
import { EnderecoEntity } from "./Endereco";


// A interface de propriedades para entidade de Identidade não precisa receber um ID
// precisamente, pois é atribuição do sistema daqueles que trabalham com requisições
export interface IdentidadeProps {
    id?: string;
    nome: Nome;
    cpf: Cpf;
    dataNascimento: DataNascimento;

    genero: Genero;
    pronome?: Pronome;
    
    email?: Email;
    telefone: Telefone;
    senha: Senha;
    endereco: EnderecoEntity;

    criadoEm: Date;
    atualizadoEm: Date;
}