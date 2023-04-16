import { MealsRepository } from "@/repositories/meals-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UserHasNoMealError } from "./errors/user-has-no-meal";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  totalMeals: number;
  totalMealsOnDiet: number;
  totalMealsOffDiet: number;
  bestStreakMealsOnDiet: number;
}

export class GetUserMetricsUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealsRepository
  ) { }

  async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const totalMeals = await this.mealsRepository.countTotalMealsByUser(userId);

    if (totalMeals === 0) {
      throw new UserHasNoMealError()
    }

    const totalMealsOnDiet = await this.mealsRepository.countTotalMealsOnDietByUserId(userId);
    const totalMealsOffDiet = await this.mealsRepository.countTotalMealsOffDietByUserId(userId);
    const bestStreakMealsOnDiet = await this.mealsRepository.streakMealsOnDiet(userId);


    return {
      totalMeals,
      totalMealsOnDiet,
      totalMealsOffDiet,
      bestStreakMealsOnDiet
    }

  }
}