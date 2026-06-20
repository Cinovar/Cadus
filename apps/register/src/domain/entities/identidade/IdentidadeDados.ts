import type { EnderecoDados } from "../endereco/EnderecoDados";

export interface IdentidadeDados {
    nome: string;
    cpf: string;
    dataNascimento: string;

    genero: string;
    pronome?: string;
    
    email: string;
    telefone: string;
    senha: string;
    endereco: EnderecoDados;
}