import { MealsRepository } from "@/repositories/meals-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Meal } from "@/@types/meal";

interface SearchMealByIdUseCaseRequest {
  mealId: string
}

interface SearchMealByIdUseCaseResponse {
  meal: Meal
}

export class SearchMealByIdUseCase {
  constructor(private mealsRepository: MealsRepository) { }
  async execute({ mealId }: SearchMealByIdUseCaseRequest): Promise<SearchMealByIdUseCaseResponse> {
    const meal = await this.mealsRepository.searchMealById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}