import { Meal } from "@/@types/meal"

export interface CreateRecipeParams {
  name: string,
  description: string,
  date_meal: string,
  on_diet: boolean,
  user_id: string
}

export interface UpdateMealParams {
  id: string,
  name: string,
  description: string,
  date_meal: string,
  on_diet: boolean,
  user_id: string
}

export interface MealsRepository {
  create(data: CreateRecipeParams): Promise<Meal>
  listMealsByUser(user_id: string): Promise<Meal[]>
  searchMealById(id: string): Promise<Meal | null>
  delete(id: string): Promise<void>
  save(meal: Meal): Promise<Meal>
  countTotalMealsByUser(id: string): Promise<number>
  countTotalMealsOnDietByUserId(id: string): Promise<number>
  countTotalMealsOffDietByUserId(id: string): Promise<number>
  streakMealsOnDiet(id: string): Promise<number>
}