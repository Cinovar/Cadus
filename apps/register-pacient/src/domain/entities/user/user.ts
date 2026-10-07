// Value objects
import { Name } from "./name";
import { Cpf } from "./cpf";
import { Dates } from "../../value-objects/dates";
import { Gender } from "./gender";
import { Pronoun } from "./pronoun";
import { Telephone } from "./telephone";
import { Email } from "./email";
import { Password } from "./password";
import { UserId } from "./user-id";
import { AddressId } from "../address/address-id";
// Types of user data
import type { UserData } from "./user-data";
// Shared
import { type Either, failure, success } from "../../../shared/either";
// Validation
import { Validation } from "../../../shared/validation";
// Errors
import { PronounError } from "./errors/pronoun-errors";
import { UserCreateError } from "./errors/user-errors";

// Modelo de User
export class User {
  private _id: string;
  private _addressId: string;
  private _props: UserData;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | undefined;

  constructor(
    userId: string,
    addressId: string,
    props: UserData,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date,
  ) {
    this._id = userId;
    this._addressId = addressId;
    this._props = props;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._deletedAt = deletedAt;
  }

  // Método de fábrica para criar uma nova instância de UserEntity
  public static create(
    {
      name,
      cpf,
      birthDate,
      gender,
      pronoun,
      email,
      telephone,
      password,
    }: UserData,
    userId: string,
    addressId: string,
  ): Either<UserCreateError, User> {
    // Validação por fp-ts
    const UserProps: Record<string, Either<Error, any>> = {
      id: UserId.create(userId),
      addressId: AddressId.create(addressId),
      name: Name.create(name),
      cpf: Cpf.create(cpf),
      birthDate: Dates.create(birthDate),
      gender: Gender.create(gender),
      pronoun: pronoun
        ? Pronoun.create(pronoun)
        : success<PronounError, undefined>(undefined),
      email: Email.create(email),
      telephone: Telephone.create(telephone),
      password: Password.create(password),
      createdAt: Dates.create(new Date()),
      updatedAt: Dates.create(new Date()),
    };

    const resultProps: Either<Error[], any> = Validation.combine(UserProps);

    // Retorno de erros
    if (resultProps.isError()) {
      return failure(new UserCreateError(JSON.stringify(resultProps.value)));
    }

    const { createdAt, updatedAt, ...props } = resultProps.value;

    return success(new User(userId, addressId, props, createdAt, updatedAt));
  }

  public static reconstitute(
    userId: string,
    addressId: string,
    props: UserData,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | undefined,
  ): User {
    return new User(userId, addressId, props, createdAt, updatedAt, deletedAt);
  }

  // Getters for the class members
  public get value(): UserData {
    return this._props;
  }

  public get userId(): string {
    return this._id;
  }
  public get addressId(): string {
    return this._addressId;
  }

  public get name(): string {
    return this._props.name;
  }

  public get cpf(): string {
    return this._props.cpf;
  }

  public get gender(): string {
    return this._props.gender;
  }

  public get birthDate(): Date {
    return this._props.birthDate;
  }

  public get pronoun(): string | undefined | null{
    return this._props.pronoun;
  }

  public get email(): string {
    return this._props.email;
  }

  public get telephone(): string {
    return this._props.telephone;
  }

  public get password(): string {
    return this._props.password;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get deletedAt(): Date | undefined {
    return this._deletedAt;
  }
}
