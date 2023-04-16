import { randomUUID } from "node:crypto";
import { User } from "../../@types/user";
import { CreateUserParams, UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {

  public registers: User[] = []

  async create(data: CreateUserParams): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password_hash,
      created_at: (new Date()).toString()
    }

    this.registers.push(user);
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = this.registers.find((register) => register.id === id)

    if (!user) {
      return null
    }
    return user;
  }
}