import { Address } from "../../../domain/entities/address/address";
import { AddressId } from "../../../domain/entities/address/address-id";
import type { AddressData } from "../../../domain/entities/address/address-data";
import type { RegisterAddressDTO } from "../../ports/dto/register-address-dto";
import type { IAddressRepo } from "../../ports/repositories/address-repo";
import { failure } from "../../../shared/either";
import { IdGenerator } from "../../helpers/id-generator";
import {
  CreateAddressError,
  CreateAddressIdError,
} from "../../errors/address-use-case-errors";
import { ExistsAddressRepoError } from "../../errors/address-repo-errors";

export interface IRegisterAddressUC {
  execute: (adddressData: AddressData) => Promise<RegisterAddressDTO>;
}

export class RegisterAddress implements IRegisterAddressUC {
  private readonly _addressRepo: IAddressRepo;

  constructor(addressRepo: IAddressRepo) {
    this._addressRepo = addressRepo;
  }

  async execute(addressData: AddressData): Promise<RegisterAddressDTO> {
    // Verifyng address existence
    const addressAlreadyExists: boolean = await this._addressRepo.exists(
      addressData.zipCode,
    );
    if (addressAlreadyExists) {
      return failure(new ExistsAddressRepoError("The address already exists."));
    }
    // New Address process
    const newAddressId = AddressId.create(new IdGenerator().generate());
    if (newAddressId.isError()) {
      return failure(
        new CreateAddressIdError("Register address id error case."),
      );
    }
    const newAddress = Address.create(addressData, newAddressId.value);
    if (newAddress.isError()) {
      return failure(
        new CreateAddressError("Address create error - RegisterAddressUserCase.")
      );
    }
    await this._addressRepo.add(newAddress.value);
    return newAddress;
  }
}
