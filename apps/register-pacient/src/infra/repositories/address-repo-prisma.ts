// Domain objects
import type { AddressData } from "../../domain/entities/address/address-data";
import { Address } from "../../domain/entities/address/address";
import { AddressId } from "../../domain/entities/address/address-id";
import { ZipCode } from "../../domain/entities/address/zip-code";
import { NumberAddress } from "../../domain/entities/address/number-address";
import { PublicSpace } from "../../domain/entities/address/public-space";
import { Complement } from "../../domain/entities/address/complement";
import { Dates } from "../../domain/value-objects/dates";
import type { PrismaAddrDTO } from "../../application/ports/dto/prisma-addr-dto";
// Repository and Database
import type { IAddressRepo } from "../../application/ports/repositories/address-repo";
import { prisma } from "../adapters/db";
// Errors
import type { DomainError } from "../../domain/errors/domain-error";
import {
  AddressNotFoundError,
  AddressRepoDataCorruptionError,
} from "./errors/address-repo-erros";
// Shared
import type { Either } from "../../shared/either";

export class PrismaAddressRepository implements IAddressRepo {
  async add(address: Address): Promise<void> {
    await prisma.address.create({
      data: {
        id: address.id,
        zipCode: address.zipCode,
        number: address.number,
        publicSpace: address.publicSpace ? address.publicSpace : null,
        complement: address.complement ? address.complement : null,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
      },
    });
  }

  async exists(zipCode: string): Promise<boolean> {
    const count = await prisma.address.count({
      where: { zipCode: zipCode },
    });

    return count > 0;
  }

  async findAddressById(id: string): Promise<AddressData> {
    const row = await prisma.address.findUnique({
      where: { id: id },
    });
    if (!row) {
      throw new AddressNotFoundError(id);
    }

    return this.toDomainEntity(row);
  }

  async findAddressByZipCode(zipCode: string): Promise<Address> {
    const row = await prisma.address.findUnique({
      where: { zipCode: zipCode },
    });

    if (!row) {
      throw new AddressNotFoundError(zipCode);
    }

    return this.toDomainEntity(row);
  }

  async findAllAddress(): Promise<Address[]> {
    const rows = await prisma.address.findMany();
    return rows.map((row : any) => this.toDomainEntity(row));
  }

  async remove(zipCode: string): Promise<AddressData> {
    // For the moment it's really deleted
    const row = await prisma.address.delete({
      where: { zipCode: zipCode },
    });
    return this.toDomainEntity(row);
  }


  // Function 
  private toDomainEntity(row: PrismaAddrDTO): Address {
    const id = this.unwrap(AddressId.reconstitute(row.id), "id");
    const zipCode = this.unwrap(ZipCode.create(row.zipCode), "zipCode");
    const number = this.unwrap(NumberAddress.create(row.number), "number");
    const publicSpace = row.publicSpace
      ? this.unwrap(PublicSpace.create(row.publicSpace), "publicSpace")
      : undefined;
    const complement = row.complement
      ? this.unwrap(Complement.create(row.complement), "complement")
      : undefined;
    const createdAt = this.unwrap(Dates.create(row.createdAt), "createdAt");
    const updatedAt = this.unwrap(Dates.create(row.updatedAt), "updatedAt");

    return Address.reconstitute(
      id,
      { zipCode, number, publicSpace, complement },
      createdAt,
      updatedAt,
    );
  }

  private unwrap<R>(result: Either<DomainError, R>, field: string): R {
    if (result.isSuccess()) {
      return result.value;
    }

    throw new AddressRepoDataCorruptionError(field, result.value.message);
  }
}
