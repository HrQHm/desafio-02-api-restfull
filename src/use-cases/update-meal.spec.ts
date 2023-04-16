import { beforeEach, describe, expect, it } from "vitest";
import { UpdateMealUseCase } from "./update-meal";
import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let mealsRepositoryInMemory: InMemoryMealsRepository
let sut: UpdateMealUseCase

describe('Update meal use case', () => {
  beforeEach(() => {
    mealsRepositoryInMemory = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(mealsRepositoryInMemory)
  })

  it('Should be able to update a meal', async () => {
    const meal = await mealsRepositoryInMemory.create({
      name: 'Meal1',
      description: 'Meal Test',
      on_diet: true,
      date_meal: (new Date()).toString(),
      user_id: 'user1'
    })

    const updatedMeal = await sut.execute({
      id: meal.id,
      name: 'Meal2',
      description: 'Meal Test2',
      on_diet: false,
      date_meal: meal.date_meal,
    })

    expect(updatedMeal).toEqual(expect.objectContaining({ name: 'Meal2' }))
    expect(updatedMeal).toEqual(expect.objectContaining({ on_diet: false }))
  })

  it('should not be able to update a meal with wrong id', async () => {
    await expect(() =>
      sut.execute({
        id: 'inexistent-id-meal',
        name: 'Meal2',
        description: 'Meal Test2',
        on_diet: false,
        date_meal: (new Date()).toString(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})