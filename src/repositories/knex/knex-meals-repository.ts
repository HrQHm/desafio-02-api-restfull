import { Meal } from "@/@types/meal";
import { CreateRecipeParams, MealsRepository } from "../meals-repository";
import { knex } from "@/database";
import { randomUUID } from "node:crypto";

export class KnexMealsRepository implements MealsRepository {
  async create({
    name,
    description,
    date_meal,
    on_diet,
    user_id
  }: CreateRecipeParams): Promise<Meal> {
    const meal = await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      date_meal,
      on_diet,
      user_id
    }).returning<Meal>("*")

    return meal;
  }

  async listMealsByUser(user_id: string): Promise<Meal[]> {
    const meals = await knex('meals').where({
      user_id
    });

    return meals;
  }

  async searchMealById(id: string): Promise<Meal | null> {
    const meal = await knex('meals').where({
      id
    }).first()

    if (!meal) {
      return null
    }

    return meal
  }

  async delete(id: string): Promise<void> {
    await knex('meals').where({
      id
    }).del()
  }

  async save(meal: Meal): Promise<Meal> {
    const updatedMeal = await knex('meals')
      .where({
        id: meal.id
      })
      .update({
        name: meal.name,
        description: meal.description,
        on_diet: meal.on_diet,
        date_meal: meal.date_meal
      }).returning<Meal>("*")

    return updatedMeal;
  }

  async countTotalMealsByUser(id: string): Promise<number> {
    const totalCount = await knex('meals').count('id').where({
      user_id: id
    })

    return totalCount[0]['count(`id`)'];
  }

  async countTotalMealsOnDietByUserId(id: string): Promise<number> {
    const totalCount = await knex('meals').count('id').where({
      user_id: id,
      on_diet: true
    })

    return totalCount[0]['count(`id`)'];
  }

  async countTotalMealsOffDietByUserId(id: string): Promise<number> {
    const totalCount = await knex('meals').count('id').where({
      user_id: id,
      on_diet: false
    })

    return totalCount[0]['count(`id`)'];
  }

  async streakMealsOnDiet(id: string): Promise<number> {

    const totalCount = await knex.raw(`
      SELECT MAX(cnt)
      FROM (
	      SELECT user_id
		    ,COUNT(*) AS cnt
	      FROM (
		      SELECT user_id
			    ,on_diet
			    ,SUM(CASE 
					WHEN on_diet <> 1
						THEN 1
					END) OVER (
				    PARTITION BY user_id ORDER BY date_meal ROWS UNBOUNDED PRECEDING
				  ) AS DUMMY
		      FROM meals
		    ) dt
	      WHERE on_diet = 1
		    AND user_id = ?
	      GROUP BY DUMMY
	    ) dt
    `, id)


    return totalCount[0]['MAX(cnt)'];
  }

}