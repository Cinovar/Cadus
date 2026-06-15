export interface IdentidadeDados {
    nome: string;
    cpf: string;
    dataNascimento: string;

    genero: string;
    pronome?: string;
    
    email: string;
    telefone: string;
    senhaHash: string;
    enderecoId: string;

    criadoEm: Date;
    atualizadoEm: Date;
}