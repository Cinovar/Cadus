import type { AddressData } from "../../../../domain/entities/address/address-data";
import type { IAddressRepo } from "../../../ports/repositories/address-repo";

export class InMemoryAddressRepo implements IAddressRepo {
  add(addressData: AddressData): Promise<void> {}
  exists(zipCode: string): Promise<boolean> {}
  findAddressByZipCode(zipCode: string): Promise<AddressData> {}
  findAllAddress(): Promise<AddressData[]> {}
  remove(zipCode: string): Promise<AddressData> {}
}
