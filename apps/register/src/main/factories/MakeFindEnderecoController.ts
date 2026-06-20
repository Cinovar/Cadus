import type { IEnderecoRespository } from "../../application/ports/respositories/IEnderecoRepository";
import { InMemoryEnderecoRepository } from "../../application/ports/respositories/in-memory-tests/InMemoryEnderecoRepository";
import { FindEnderecoController } from "../../presentation/controllers/FindEnderecoController";

/**
 * 
 * @param enderecoRepository 
 * @returns - retorna um controller de 
 */
export const makeFindEnderecoController = (
    enderecoRepository: IEnderecoRespository
) : FindEnderecoController => {
    const repository = enderecoRepository ?? new InMemoryEnderecoRepository([]);
    const findUseCase = new FindEndereco(repository);
    const controller = FindEnderecoController(findUseCase);

    return controller;
}