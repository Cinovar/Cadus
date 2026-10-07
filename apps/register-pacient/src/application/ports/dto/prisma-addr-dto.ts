import type { AddressData } from "../../../domain/entities/address/address-data";

export interface PrismaAddrDTO extends AddressData {
    id : string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

