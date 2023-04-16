import { Meal } from "@/@types/meal";
import { MealsRepository } from "@/repositories/meals-repository";

interface ListMealUseCaseRequest {
  user_id: string
}

interface ListMealUseCaseResponse {
  meals: Meal[]
}

export class ListMealsUseCase {
  constructor(private mealsRepository: MealsRepository) { }
  async execute({ user_id }: ListMealUseCaseRequest): Promise<ListMealUseCaseResponse> {
    const meals = await this.mealsRepository.listMealsByUser(user_id)

    return { meals }
  }
}