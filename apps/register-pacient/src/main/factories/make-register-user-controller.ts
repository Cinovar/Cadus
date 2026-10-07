import type { IUserRepo } from "../../application/ports/repositories/user-repo";
import type { RegisterUserController } from "../../presentation/controllers/register-user-controller";

export const amkeRegisterUserController = (
  userRepo: IUserRepo,
): RegisterUserController => {};
