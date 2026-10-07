import type { IAddressRepo } from "../../application/ports/repositories/address-repo";
import { InMemoryAddressRepo } from "../../application/usecases/register-address/in-memory-repository/in-memory-address-repo";
import { RegisterAddress } from "../../application/usecases/register-address/register-address";
import { RegisterAddressController } from "../../presentation/controllers/register-address-controller";
import { Logger } from "../../presentation/helpers/logger-helper";
import { Zodvalidator } from "../../presentation/helpers/validator-helper";
import { registerAddressSchema } from "../../presentation/zod-schemas/zod-register-address-schema";

export const makeRegisterAddressController = (
  addressRepo?: IAddressRepo,
): RegisterAddressController => {
  const repository = addressRepo ?? new InMemoryAddressRepo();
  const validator = new Zodvalidator(registerAddressSchema);
  const logger = new Logger();
  const registerAddressUseCase = new RegisterAddress(repository);
  const registerAddressController = new RegisterAddressController(
    registerAddressUseCase,
    validator,
    logger,
  );
  return registerAddressController;
};
