import type { EnderecoProps } from "../../domain/entities/endereco/EnderecoProps";

export interface IEnderecoRespository {
    add (): Promise<void>
    exists (): Promise<boolean>
    findEnderecoByCep (cep: string): Promise<EnderecoProps>
    findAllEnderecos (): Promise<EnderecoProps[]>
}