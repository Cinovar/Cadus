import type { Address } from "../../../domain/entities/address/address";
import type { AddressData } from "../../../domain/entities/address/address-data";

export interface IAddressRepo {
  add(addressData: Address): Promise<void>;
  exists(zipCode: string): Promise<boolean>;
  findAddressById(id : string): Promise<AddressData>;
  findAddressByZipCode(zipCode: string): Promise<Address>;
  findAllAddress(): Promise<Address[]>;
  remove(zipCode: string): Promise<AddressData>;
}
