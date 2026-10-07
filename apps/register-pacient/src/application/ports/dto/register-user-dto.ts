import type { User } from "../../../domain/entities/user/user";
import type { Either } from "../../../shared/either";
import type { ApplicationError } from "../../errors/application-error";

export type RegisterUserDTO = Either<ApplicationError, User>;
