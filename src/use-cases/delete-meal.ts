import { MealsRepository } from "@/repositories/meals-repository";

interface DeleteMealUseCaseRequest {
  mealId: string
}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) { }

  async execute({ mealId }: DeleteMealUseCaseRequest): Promise<void> {
    await this.mealsRepository.delete(mealId);

  }
}