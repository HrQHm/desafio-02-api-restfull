import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchMealByIdUseCase } from "./search-meal-by-id";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let mealsRepositoryInMemory: InMemoryMealsRepository;
let sut: SearchMealByIdUseCase

describe('Search Meal by Id use case', () => {
  beforeEach(() => {
    mealsRepositoryInMemory = new InMemoryMealsRepository()
    sut = new SearchMealByIdUseCase(mealsRepositoryInMemory)
  })

  it('should be able to get meal by id', async () => {
    const createdMeal = await mealsRepositoryInMemory.create({
      name: 'Meal1',
      description: 'Meal Test',
      on_diet: true,
      date_meal: (new Date()).toString(),
      user_id: 'user1'
    })

    const { meal } = await sut.execute({ mealId: createdMeal.id })

    expect(meal.id).toEqual(expect.any(String))
    expect(meal.name).toEqual(expect.any(String))
  })

  it('should not be able to get meal with wrong id', async () => {
    await expect(() => sut.execute({
      mealId: 'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})