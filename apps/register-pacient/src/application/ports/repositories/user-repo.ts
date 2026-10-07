import type { User } from "../../../domain/entities/user/user";
import type { UserData } from "../../../domain/entities/user/user-data";

export interface IUserRepo {
  add(data: UserData): Promise<void>;
  exists(cpf: string): Promise<boolean>;
  findUserById (id: string): Promise<UserData>;
  findUserByCpf(cpf: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  findAllUsers(): Promise<User[]>;
  remove(cpf: string): Promise<UserData>;
}
