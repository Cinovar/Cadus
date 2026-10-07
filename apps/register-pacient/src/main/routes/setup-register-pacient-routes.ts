// Router, adapters e factories
import type { Router } from "express";
// import { makeRegisterUserController } from "../factories/make-register-user-controller";
import { makeRegisterAddressController } from "../factories/make-register-address-controller";
// import { PrismaUserRepository } from "../../infra/repositories/user-repo-prisma";
import { PrismaAddressRepository } from "../../infra/repositories/address-repo-prisma";
import { adaptRoute } from "../../infra/adapters/router-adapter";

export const setupRegisterRoutes = (router: Router): void => {
  // const registerUserController = makeRegisterUserController(new PrismaUserRepository());
  const registerAddressController = makeRegisterAddressController(
    new PrismaAddressRepository(),
  );

  // Rota para registrar nova identidade
  // router.post("/users", adaptRoute(registerUserController));
  // router.patch(
  //   "/users",
  //   adaptRoute(updateUserController)
  // )
  // router.get (
  //   "/users/",
  //   adaptRoute(findAllUserController)
  // );
  //   router.get(
  //     "/users/:id",
  //     adaptRoute(findUserController)
  //   )

  // Rota para registrar novo endereço
  router.post("/address", adaptRoute(registerAddressController));
  // router.patch(
  //   "/users",
  //   adaptRoute(updateAddressController)
  // )
  // router.get (
  //   "/address/",
  //   adaptRoute(findAllAddressController)
  // );
  //   router.get(
  //     "/address/:id",
  //     adaptRoute(findAddressController)
  //   );
};
