import type { IIdentidadeRepository } from "../../application/ports/respositories/IIdentidadeRepository";
import { InMemoryIdentidadeRepo } from "../../application/ports/respositories/in-memory-tests/InMemoryIdentidadeRepo";
import { PrismaIdentidadeRepository } from "../../infra/database/repsositories/PrismaIdentidadeRepository";
import { FindIdentidade } from "../../application/usecases/find-identidade/FindIdentidade";
import { GetUsuarioByCpfController } from "../../presentation/controllers/GetUsuarioByCpfController";

export const makeGetUsuarioByCpfController = (
    identidadeRepository?: IIdentidadeRepository
): GetUsuarioByCpfController => {
    const isProd = !!process.env.NEON_DATABASE_URL;
    const repository = identidadeRepository ?? (isProd
        ? new PrismaIdentidadeRepository()
        : new InMemoryIdentidadeRepo([]));

    const findUseCase = new FindIdentidade(repository);
    return new GetUsuarioByCpfController(findUseCase);
};