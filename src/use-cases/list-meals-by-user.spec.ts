import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { ListMealsUseCase } from "./list-meals-by-user";

let mealsRepositoryInMemory: InMemoryMealsRepository;
let sut: ListMealsUseCase;

describe("List meals by user", () => {
  beforeEach(() => {
    mealsRepositoryInMemory = new InMemoryMealsRepository()
    sut = new ListMealsUseCase(mealsRepositoryInMemory)
  })

  it("should be able to list all meals by user", async () => {
    await mealsRepositoryInMemory.create({
      name: 'Meal1',
      description: 'Meal Test',
      on_diet: true,
      date_meal: (new Date()).toString(),
      user_id: 'user1'
    })

    await mealsRepositoryInMemory.create({
      name: 'Meal2',
      description: 'Meal Test',
      on_diet: true,
      date_meal: (new Date()).toString(),
      user_id: 'user1'
    })

    const { meals } = await sut.execute({ user_id: 'user1' })
    expect(meals).toHaveLength(2)
    expect(meals).toEqual([
      expect.objectContaining({ name: 'Meal1' }),
      expect.objectContaining({ name: 'Meal2' })
    ])
  })
})