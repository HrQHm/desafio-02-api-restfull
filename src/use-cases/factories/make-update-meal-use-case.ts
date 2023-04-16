import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository";
import { UpdateMealUseCase } from "../update-meal";

export function makeUpdateMealUseCase() {
  const knexMealsRepository = new KnexMealsRepository()
  const updateMealUseCase = new UpdateMealUseCase(knexMealsRepository)

  return updateMealUseCase
}