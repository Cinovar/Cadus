import { User } from "../../domain/entities/user/user.ts";
import { Dates } from "../../domain/value-objects/dates.ts";
import { Email } from "../../domain/entities/user/email.ts";
import { AddressId } from "../../domain/entities/address/address-id.ts";
import { Pronoun } from "../../domain/entities/user/pronoun.ts";
import { Telephone } from "../../domain/entities/user/telephone.ts";
import { Password } from "../../domain/entities/user/password.ts";
import { UserId } from "../../domain/entities/user/user-id.ts";
import { Name } from "../../domain/entities/user/name.ts";
import { Cpf } from "../../domain/entities/user/cpf.ts";
import type { UserData } from "../../domain/entities/user/user-data.ts";
import type { IUserRepo } from "../../application/ports/repositories/user-repo.ts";
// Prisma
import { PrismaUserDTO } from "../../application/ports/dto/prisma-user-dto.ts";
import { prisma } from "../adapters/db.ts";
import {
  type User as PrismaUserRow,
  type Gender as PrismaGender,
  type Pronoun as PrismaPronoun,
  Gender,
} from "../database/generated/prisma/client.ts";
// Shared
import type { Either } from "../../shared/either.ts";
// Errors
import type { DomainError } from "../../domain/errors/domain-error.ts";
import { PrismaUserRepoDataCorruptionError } from "./errors/user-repo-errors.ts";


export class PrismaUserRepository implements IUserRepo {

  async add(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.userId,
        addressId: user.addressId,
        name: user.name,
        cpf: user.cpf,
        birthDate: user.birthDate,
        gender: user.gender,
        pronoun: user.pronoun
          ? user.pronoun
          : null,
        email: user.email,
        telephone: user.telephone,
        password: user.password,
      },
    });
  }

  async exists(cpf: string): Promise<boolean> {
    const count = await prisma.user.count({
      where: { cpf: cpf },
    });

    return count > 0;
  }

  async findUserById(id: string): Promise<UserData> {
    const row = await prisma.user.findUnique({
      where: { id: id },
    });

    return this.toDomainEntity(row);
  }

  async findUserByCpf(cpf: string): Promise<User> {
    const row = await prisma.user.findUnique({
      where: { cpf: cpf },
    });

    return this.toDomainEntity(row);
  }

  async findUserByEmail(email: string): Promise<User> {
    const row = await prisma.user.findUnique({
      where: { email: email },
    });

    return this.toDomainEntity(row);
  }

  async findAllUsers(): Promise<User[]> {
    const rows = await prisma.user.findMany();

    return rows.map((row : any) => this.toDomainEntity(row));
  }

  async remove(cpf: string): Promise<UserData> {
    const row = await prisma.user.delete({
      where: {
        cpf: cpf
      }
    })
    return row;
  }

  /**
   * It's a problem to map the Gender and the Pronoun enums
   * 
   * 
   *  
   */

  private toDomainGenderEnum () {

  }

  private toDomainPronounEnum () {

  }

  private toDomainEntity(row: PrismaUserDTO): User {
    const id = this.unwrap(UserId.create(row.id), "id");
    const addressId = this.unwrap(
      AddressId.reconstitute(row.addressId),
      "addressId",
    );
    const name = this.unwrap(Name.create(row.name), "name");
    const cpf = this.unwrap(Cpf.create(row.cpf), "cpf");
    const birthDate = this.unwrap(
      Dates.create(row.birthDate),
      "birthDate",
    );
    const gender = this.unwrap(Gender.create(row.gender), "gender");
    const pronoun = row.pronoun
      ? this.unwrap(Pronoun.create(row.pronoun), "pronoun")
      : undefined;
    const email = this.unwrap(Email.create(row.email), "email");
    const telephone = this.unwrap(Telephone.create(row.telephone), "telephone");
    const password = this.unwrap(Password.create(row.password), "password");
    const createdAt = this.unwrap(Dates.create(row.createdAt), "createdAt");
    const updateAt = this.unwrap(
      Dates.create(row.updatedAt),
      "updateAt",
    );
    const deletedAt = row.deletedAt
      ? this.unwrap(Dates.create(row.deletedAt), "deletedAt")
      : undefined;

    return User.reconstitute(
      id,
      addressId,
      {
        name,
        cpf,
        birthDate,
        gender,
        pronoun,
        email,
        telephone,
        password,
        addressId,
      },
      createdAt,
      updateAt,
      deletedAt,
    );
  }

  private unwrap<R>(result: Either<DomainError, R>, field: string): R {
    if (result.isSuccess()) {
      return result.value;
    }

    throw new PrismaUserRepoDataCorruptionError(
      field,
      result.value.message,
    );
  }
}
