import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository";
import { SearchMealByIdUseCase } from "../search-meal-by-id";


export function makeSearchMealByIdUseCase() {
  const knexMealsRepository = new KnexMealsRepository()
  const searchMealByIdUseCase = new SearchMealByIdUseCase(knexMealsRepository)

  return searchMealByIdUseCase
}