// Domain
import type { IRegisterAddressUC } from "../../application/usecases/register-address/register-address";
// Controllers
import { BaseController } from "./base-controller";
import { badRequest, conflict, ok, serverError } from "../helpers/http-helper";
import type { HttpRequest, HttpResponse } from "../protocol-interfaces/http";
// Validation
import { type ILogger } from "../helpers/logger-helper";
import type { IValidator } from "../helpers/validator-helper";
// Shared
import { type Either } from "../../shared/either";
// Errors
import type { AddressData } from "../../domain/entities/address/address-data";
import { ValidationError } from "../errors/validation-errors";

export class RegisterAddressController extends BaseController<AddressData> {
  private readonly _registerAddressUC: IRegisterAddressUC;
  constructor(
    registerAddressUC: IRegisterAddressUC,
    validator: IValidator<AddressData>,
    logger: ILogger,
  ) {
    super(validator, logger);
    this._registerAddressUC = registerAddressUC;
  }

  override async handle(req: HttpRequest): Promise<HttpResponse> {
    // Validation of the body request
    const resultAddressData: Either<ValidationError, AddressData> =
      this._validator.validate(req.body);
    if (resultAddressData.isError()) {
      this._logger.info({
        event: "validatioin_failed",
        error: resultAddressData.value,
      });
      return badRequest(resultAddressData.value);
    }
    // Creating Address
    const registerAddress = await this._registerAddressUC.execute(
      resultAddressData.value,
    );
    if (registerAddress.isError()) {
      this._logger.error({
        event: "register_address_failed",
        error: registerAddress.value,
      });
      return this.handleError(registerAddress.value);
    }

    return ok("The address was registered.");
  }
}
