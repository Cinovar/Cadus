export interface IdentidadeDados {
    nome: string;
    cpf: string;
    dataNascimento: Date;

    genero: string;
    pronome?: string;
    
    email: string;
    telefone: string;
    senha: string;
    enderecoId: string;

    criadoEm: Date;
    atualizadoEm: Date;
}