import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UserHasNoMealError } from "./errors/user-has-no-meal";

let usersRepositoryInMemory: InMemoryUsersRepository
let mealsRepositoryInMemory: InMemoryMealsRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics use case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository()
    mealsRepositoryInMemory = new InMemoryMealsRepository()
    sut = new GetUserMetricsUseCase(usersRepositoryInMemory, mealsRepositoryInMemory)
  })

  it('should be able to get user metrics', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const meal1 = await mealsRepositoryInMemory.create({
      name: 'Meal1',
      description: 'Meal Test',
      on_diet: true,
      date_meal: (new Date()).toString(),
      user_id: user.id
    })

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 4);

    const meal2 = await mealsRepositoryInMemory.create({
      name: 'Meal2',
      description: 'Meal Test',
      on_diet: false,
      date_meal: (tomorrow).toString(),
      user_id: user.id
    })

    tomorrow = new Date(meal1.date_meal);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const meal3 = await mealsRepositoryInMemory.create({
      name: 'Meal2',
      description: 'Meal Test',
      on_diet: true,
      date_meal: (tomorrow).toString(),
      user_id: user.id
    })

    const result = await sut.execute({ userId: user.id });


    expect(result).toMatchObject({
      bestStreakMealsOnDiet: 2,
      totalMeals: 3,
      totalMealsOffDiet: 1,
      totalMealsOnDiet: 2
    })
  })

  it('should not be able to show metrics with wrong user id', async () => {
    await expect(() => sut.execute({
      userId: 'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to show metrics if user has no meal', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await expect(() => sut.execute({
      userId: user.id
    })).rejects.toBeInstanceOf(UserHasNoMealError)
  })
})