import type { UserData } from "../../../domain/entities/user/user-data";

export interface PrismaUserDTO extends UserData{
    id : string;
    addressId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}