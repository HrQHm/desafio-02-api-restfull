import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { KnexUsersRepository } from "@/repositories/knex/knex-users-repository";


export function makeGetUserMetricsUseCase() {
  const knexMealsRepository = new KnexMealsRepository()
  const knexUsersRepository = new KnexUsersRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(knexUsersRepository, knexMealsRepository)

  return getUserMetricsUseCase
}