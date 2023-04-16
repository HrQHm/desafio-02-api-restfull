import { randomUUID } from "node:crypto";
import { User } from "../../@types/user";
import { knex } from "../../database";
import { CreateUserParams, UsersRepository, UserResponse } from "../users-repository";

export class KnexUsersRepository implements UsersRepository {

  async create({ name, email, password_hash }: CreateUserParams): Promise<User> {

    const user = await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password_hash,
    }).returning<User>("*")

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await knex('users').where('id', id).first();

    if (!user) {
      return null
    }

    return user;
  }
}