import type { Cep } from "../../domain/entities/endereco/Cep";
import type { EnderecoProps } from "../../domain/entities/endereco/EnderecoProps";

export interface IEnderecoRespository {
    add (enderecoProps: EnderecoProps): Promise<void>
    exists (cep: Cep): Promise<boolean>
    findEnderecoByCep (cep: string): Promise<EnderecoProps>
    findAllEnderecos (): Promise<EnderecoProps[]>
}