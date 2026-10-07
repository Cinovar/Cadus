import { type Either, success, failure } from "../../../shared/either";
import type { AddressData } from "./address-data";
// VOs
import { AddressId } from "./address-id";
import { Dates } from "../../value-objects/dates";
import { ZipCode } from "./zip-code";
import { PublicSpace } from "./public-space";
import { NumberAddress } from "./number-address";
import { Complement } from "./complement";
// Validation
import { Validation } from "../../../shared/validation";
// Errors
import { AddressCreateError } from "./errors/address-errors";

export class Address {
  private _id: string;
  private _props: AddressData;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | undefined;

  constructor(
    id: string,
    props: AddressData,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | undefined,
  ) {
    this._id = id;
    this._props = props;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._deletedAt = deletedAt;
  }

  public static create(
    { zipCode, publicSpace, number, complement }: AddressData,
    addressId: string,
  ): Either<AddressCreateError, Address> {
    const validations: Record<string, Either<Error, any>> = {
      addressId: AddressId.create(addressId),
      zipCode: ZipCode.create(zipCode),
      publicSpace: publicSpace
        ? PublicSpace.create(publicSpace)
        : success<Error, undefined>(undefined),
      number: NumberAddress.create(Number(number)),
      complement: complement
        ? Complement.create(complement)
        : success<Error, undefined>(undefined),
      createdAt: Dates.create(new Date()),
      updatedAt: Dates.create(new Date()),
    };

    const resultado: Either<Error[], any> = Validation.combine(validations);

    if (resultado.isError()) {
      return failure(new AddressCreateError(JSON.stringify(resultado.value)));
    }

    const { createdAt, updatedAt, ...props } = resultado.value;

    return success(new Address(addressId, props, createdAt, updatedAt));
  }

  public static reconstitute(
    id: string,
    props: AddressData,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | undefined,
  ): Address {
    return new Address(id, props, createdAt, updatedAt, deletedAt);
  }

  // Getters e Setters
  public get value(): AddressData {
    return this._props;
  }

  public get id(): string {
    return this._id;
  }

  public get zipCode(): string {
    return this._props.zipCode;
  }

  public get publicSpace(): string | undefined | null {
    return this._props.publicSpace;
  }

  public get number(): number {
    return this._props.number;
  }

  public get complement(): string | undefined | null {
    return this._props.complement;
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
