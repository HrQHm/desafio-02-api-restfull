import { Meal } from "@/@types/meal";
import { MealsRepository } from "@/repositories/meals-repository";

interface CreateMealUseCaseRequest {
  name: string,
  description: string,
  on_diet: boolean,
  date_meal: string,
  user_id: string,
}

interface CreateMealUseCaseResponse {
  meal: Meal;
}

export class CreateMealUseCase {
  constructor(private mealsRepository: MealsRepository) { }

  async execute({ name, description, on_diet, date_meal, user_id }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealsRepository.create({
      name, description, on_diet, date_meal, user_id
    })

    return { meal };
  }
}