import { Meal } from "@/@types/meal";
import { MealsRepository } from "@/repositories/meals-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface UpdateMealUseCaseRequest {
  id: string;
  name: string,
  description: string,
  on_diet: boolean,
  date_meal: string,
}

interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) { }
  async execute({
    id,
    name,
    description,
    on_diet,
    date_meal,
  }: UpdateMealUseCaseRequest): Promise<Meal> {
    const meal = await this.mealsRepository.searchMealById(id);

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    meal.name = name;
    meal.description = description;
    meal.on_diet = on_diet;
    meal.date_meal = date_meal;

    const updatedMeal = await this.mealsRepository.save(meal)

    return updatedMeal
  }
}