import { RegisterIdentidadeController } from "../../presentation/controllers/RegisterIdentidadeController";
import { RegisterIdentidade } from "../../application/usecases/registrar-identidade/RegisterIdentidade";
import type { IIdentidadeRepository } from "../../application/ports/respositories/IIdentidadeRepository";
import { InMemoryIdentidadeRepo } from "../../application/ports/respositories/in-memory-tests/InMemoryIdentidadeRepo";
import { BcryptHashProvider } from "../../infra/providers/HashProvider";
import type { IEnderecoRespository } from "../../application/ports/respositories/IEnderecoRepository";
import { InMemoryEnderecoRepository } from "../../application/ports/respositories/in-memory-tests/InMemoryEnderecoRepository";
import { RegisterEndereco } from "../../application/usecases/registrar-endereco/RegisterEndereco";

/**
 * Factory para criar RegisterIdentidadeController com dependências injetadas
 * @param identidadeRepository - Repositório customizado (opcional). Se não fornecido, usa in-memory
 * @returns Instância do RegisterIdentidadeController
 */
export const makeRegisterIdentidadeController = (
  identidadeRepository?: IIdentidadeRepository,
  enderecoRepository?: IEnderecoRespository
): RegisterIdentidadeController => {
  // Por padrão, usar in-memory
  const repositoryIdentidade = identidadeRepository ?? new InMemoryIdentidadeRepo([]);
  const repositoryEndereco = enderecoRepository ?? new InMemoryEnderecoRepository([]);
  const registerEnderecoUC = new RegisterEndereco(repositoryEndereco);
  const hashProvider = new BcryptHashProvider();
  const registerUseCase = new RegisterIdentidade(repositoryIdentidade, hashProvider, registerEnderecoUC, repositoryEndereco);
  const controller = new RegisterIdentidadeController(registerUseCase);
  return controller;
};