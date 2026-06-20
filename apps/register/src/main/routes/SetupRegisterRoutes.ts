// Router, adapters e factories
import type { Router } from "express";
import { makeRegisterIdentidadeController } from "../factories/MakeRegisterIdentidadeController";
import { makeRegisterEnderecoController } from "../factories/MakeRegisterEnderecoController";
import { makeFindIdentidadeController } from "../factories/MakeFindIdentidadeController";
import { makeFindEnderecoController } from "../factories/MakeFindEnderecoController";
import { adaptRoute } from "../../infra/adapters/ExpressRouterAdapater";

/**
 * Configura as rotas para registro de identidades e endereços
 * 
 * POST /identidades - Registra nova identidade
 * POST /enderecos - Registra novo endereço
 * GET /identidades/:id - Encontra identidade existente
 * GET /enderecos/:id - Encontra endereco existente
 * @param router - Router do Express
 */
export const setupRegisterRoutes = (router: Router): void => {
  const registerIdentidadeController = makeRegisterIdentidadeController();
  const registerEnderecoController = makeRegisterEnderecoController();
  const findIdentidadeController = makeFindEnderecoController();
  const findEnderecoController = makeFindEnderecoController();

  // Rota para registrar nova identidade
  router.post(
    "/identidades",
    adaptRoute(registerIdentidadeController)
  );

  router.get(
    "/identidades/:id",
    adaptRoute(findIdentidadeController)
  )

  // Rota para registrar novo endereço
  router.post(
    "/enderecos",
    adaptRoute(registerEnderecoController)
  );
  router.get(
    "/enderecos/:id",
    adaptRoute(findEnderecoController)
  )
};

