import { UserId } from "../../../domain/entities/user/user-id";
import { User } from "../../../domain/entities/user/user";
import type { UserData } from "../../../domain/entities/user/user-data";
import type { Address } from "../../../domain/entities/address/address";
import type { AddressData } from "../../../domain/entities/address/address-data";
import type { RegisterUserDTO } from "../../ports/dto/register-user-dto";
// Repositories
import type { IUserRepo } from "../../ports/repositories/user-repo";
import type { IAddressRepo } from "../../ports/repositories/address-repo";
// Helpers
import { IdGenerator } from "../../helpers/id-generator";
// Shared
import { type Either, success, failure } from "../../../shared/either";
import { CreateUserError, CreateUserIdError, UserAdrNotFoundError, UserAlreadyExistsError } from "../../errors/user-use-case-error";

export interface IRegisterUserUC{ 
  execute: (dataUser: UserData, addressData: AddressData) => Promise<RegisterUserDTO>;
}

export class RegisterUser implements IRegisterUserUC {
  private readonly _userRepo: IUserRepo;
  private readonly _addressRepo: IAddressRepo;

  constructor(
    userRepo : IUserRepo,
    addressRepo : IAddressRepo
  ) {
    this._userRepo = userRepo;
    this._addressRepo = addressRepo;
  }

  async execute(userData: UserData, addressData: AddressData): Promise<RegisterUserDTO> {
    const existsUser: boolean = await  this._userRepo.exists(userData.cpf);
    if (!existsUser){
      return failure (
        new UserAlreadyExistsError("That User already exists - RegisterUserUseCase.")
      );
    }

    // Verify exists address
    const existsAddress : boolean = await this._addressRepo.exists(addressData.zipCode);
    if (!existsAddress) {
      return failure (
        new UserAdrNotFoundError("That Address not exists - RegisterUserUseCase.")
      );
    }
    // Get Address Id
    const address : Address = await this._addressRepo.findAddressByZipCode(addressData.zipCode);
    if (!address) {
      return failure(
        new UserAdrNotFoundError("Won't possible catch the user address content.")
      );
    }
    const addressId: string = address.id;

    // Creating new user id
    const newUserId = UserId.create(new IdGenerator().generate());
    if (newUserId.isError()) {
      return failure(
        new CreateUserIdError(JSON.stringify(newUserId.value))
      );
    }

    const newUser = User.create(userData, newUserId.value, addressId);
    if (newUser.isError()) {
      return failure(
        new CreateUserError("User create error - RegisterUserUseCase.")
      );
    }
    return newUser;
  }
}
