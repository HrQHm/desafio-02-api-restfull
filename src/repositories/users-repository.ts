import { User } from "../@types/user";

export interface CreateUserParams {
  name: string,
  email: string,
  password_hash: string,
}

export interface UserResponse {
  name: string,
  email: string,
  password: string,
}

export interface UsersRepository {
  create(data: CreateUserParams): Promise<User>
  findUserById(id: string): Promise<User | null>
}