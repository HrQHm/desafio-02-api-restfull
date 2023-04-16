import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, it, expect } from "vitest";
import { CreateMealUseCase } from "./create-meal";

let mealsRepositoryInMemory: InMemoryMealsRepository;
let sut: CreateMealUseCase;

describe('Create meal use case', () => {
  beforeEach(() => {
    mealsRepositoryInMemory = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealsRepositoryInMemory)
  })

  it("should be able to create a meal", async () => {
    const { meal } = await sut.execute({
      name: 'Meal1',
      description: 'Meal Test',
      on_diet: true,
      date_meal: (new Date()).toString(),
      user_id: 'user1'
    })

    expect(meal.id).toEqual(expect.any(String))
  })
})