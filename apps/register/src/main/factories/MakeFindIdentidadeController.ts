import type { IIdentidadeRepository } from "../../application/ports/respositories/IIdentidadeRepository";
import { InMemoryEnderecoRepository } from "../../application/ports/respositories/in-memory-tests/InMemoryEnderecoRepository";
import { FindIdentidadeController } from "../../presentation/controllers/FindIdentidadeController";

/**
 * 
 * @param identidadeRespotiroy 
 */
export const makeFindIdentidadeController = (
    identidadeRespotiroy: IIdentidadeRepository
) : FindIdentidadeController => {
    const repository = identidadeRespotiroy ?? new InMemoryEnderecoRepository([]);

    const controller = new FindIdentidadeController();

    return controller;
}