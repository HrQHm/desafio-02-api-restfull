import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository";
import { DeleteMealUseCase } from "../delete-meal";

export function makeDeleteMealUseCase() {
  const knexMealsRepository = new KnexMealsRepository()
  const deleteMealUseCase = new DeleteMealUseCase(knexMealsRepository)

  return deleteMealUseCase
}