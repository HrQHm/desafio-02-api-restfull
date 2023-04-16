import { KnexMealsRepository } from "@/repositories/knex/knex-meals-repository";
import { CreateMealUseCase } from "../create-meal";

export function makeCreateMealUseCase() {
  const knexMealsRepository = new KnexMealsRepository()
  const createMealUseCase = new CreateMealUseCase(knexMealsRepository)

  return createMealUseCase
}