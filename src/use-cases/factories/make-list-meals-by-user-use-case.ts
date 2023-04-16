import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository";
import { ListMealsUseCase } from "../list-meals-by-user";


export function makeListMealsByUserUseCase() {
  const knexMealsRepository = new KnexMealsRepository()
  const listMealsByUserUseCase = new ListMealsUseCase(knexMealsRepository)

  return listMealsByUserUseCase
}