import { RegisterEnderecoController } from "../../presentation/controllers/RegisterEnderecoController";
import { RegisterEndereco } from "../../application/usecases/registrar-endereco/RegisterEndereco";
import type { IEnderecoRespository } from "../../application/ports/respositories/IEnderecoRepository";
import { InMemoryEnderecoRepository } from "../../application/ports/respositories/in-memory-tests/InMemoryEnderecoRepository";

/**
 * Factory para criar RegisterEnderecoController com dependências injetadas
 * Por padrão usa InMemoryEnderecoRepository, mas pode ser substituído por Prisma/Neon futuramente
 * @param enderecoRepository - Repositório customizado (opcional). Se não fornecido, usa in-memory
 * @returns Instância do RegisterEnderecoController
 */
export const makeRegisterEnderecoController = (
  enderecoRepository?: IEnderecoRespository
): RegisterEnderecoController => {
  // Por padrão, usar in-memory
  const repository = enderecoRepository ?? new InMemoryEnderecoRepository([]);
  const registerUseCase = new RegisterEndereco(repository);
  const controller = new RegisterEnderecoController(registerUseCase);
  return controller;
};
