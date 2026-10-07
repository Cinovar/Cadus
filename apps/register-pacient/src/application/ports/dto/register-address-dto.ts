import type { Address } from "../../../domain/entities/address/address";
import type { Either } from "../../../shared/either";
import type { ApplicationError } from "../../errors/application-error";

export type RegisterAddressDTO = Either<ApplicationError, Address>;
