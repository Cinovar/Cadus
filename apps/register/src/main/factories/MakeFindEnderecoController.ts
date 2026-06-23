import type { IEnderecoRespository } from "../../application/ports/respositories/IEnderecoRepository";
import { InMemoryEnderecoRepository } from "../../application/ports/respositories/in-memory-tests/InMemoryEnderecoRepository";
import { PrismaEnderecoRepository } from "../../infra/database/repsositories/PrismaEnderecoRepository";
import { FindEndereco } from "../../application/usecases/find-endereco/FindEndereco";
import { FindEnderecoController } from "../../presentation/controllers/FindEnderecoController";

export const makeFindEnderecoController = (
    enderecoRepository?: IEnderecoRespository
): FindEnderecoController => {
    const isProd = !!process.env.NEON_DATABASE_URL;
    const repository = enderecoRepository ?? (isProd
        ? new PrismaEnderecoRepository()
        : new InMemoryEnderecoRepository([]));

    const findUseCase = new FindEndereco(repository);
    return new FindEnderecoController(findUseCase);
};