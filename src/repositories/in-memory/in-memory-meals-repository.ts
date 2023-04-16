import { Meal } from "@/@types/meal";
import { CreateRecipeParams, MealsRepository, UpdateMealParams } from "../meals-repository";
import { randomUUID } from "node:crypto";

export class InMemoryMealsRepository implements MealsRepository {

  public registers: Meal[] = [];

  async create(data: CreateRecipeParams): Promise<Meal> {
    const meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      on_diet: data.on_diet,
      date_meal: data.date_meal,
      user_id: data.user_id,
      created_at: (new Date()).toString()
    }

    this.registers.push(meal)
    return meal;
  }

  async listMealsByUser(user_id: string): Promise<Meal[]> {
    const meals = this.registers.filter((meal) => meal.user_id == user_id)

    return meals;
  }

  async searchMealById(id: string): Promise<Meal | null> {
    const meal = this.registers.find((register) => register.id === id)

    if (!meal) {
      return null
    }

    return meal
  }

  async delete(id: string): Promise<void> {
    const mealIndex = this.registers.findIndex((register) => register.id === id);

    if (mealIndex >= 0) {
      this.registers.splice(mealIndex, 1)
    }
  }

  async save(meal: Meal): Promise<Meal> {
    const mealIndex = this.registers.findIndex((register) => register.id === meal.id)

    if (mealIndex >= 0) {
      this.registers[mealIndex] = meal
    }

    return meal
  }

  async countTotalMealsByUser(id: string): Promise<number> {
    return this.registers.filter((register) => register.user_id === id).length
  }

  async countTotalMealsOnDietByUserId(id: string): Promise<number> {
    return this.registers.filter((register) => register.user_id === id && register.on_diet === true).length
  }

  async countTotalMealsOffDietByUserId(id: string): Promise<number> {
    return this.registers.filter((register) => register.user_id === id && register.on_diet === false).length
  }

  async streakMealsOnDiet(id: string): Promise<number> {

    this.registers.sort((a, b) => {
      return new Date(a.date_meal).valueOf() - new Date(b.date_meal).valueOf();
    });


    const streak = this.registers.filter((register) => {
      if (register.user_id === id && register.on_diet) {
        return register
      }
    });


    return streak.length
  }

}