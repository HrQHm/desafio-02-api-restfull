import { beforeAll, describe, it, expect } from "vitest";
import { DeleteMealUseCase } from "./delete-meal";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";

let mealsRepositoryInMemory: InMemoryMealsRepository
let sut: DeleteMealUseCase;
describe('Delete meal Use case', () => {
  beforeAll(() => {
    mealsRepositoryInMemory = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepositoryInMemory)
  })

  it('should be able to delete a meal', async () => {
    const meal = await mealsRepositoryInMemory.create({
      name: 'Meal1',
      description: 'Meal Test',
      on_diet: true,
      date_meal: (new Date()).toString(),
      user_id: 'user1'
    })


    await sut.execute({ mealId: meal.id })

    expect(mealsRepositoryInMemory.registers).toHaveLength(0)

  })
})