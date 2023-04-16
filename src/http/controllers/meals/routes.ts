import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { deleteController } from "./delete-controller";
import { update } from "./update-controller";
import { searchMealController } from "./search-meal-controller";

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/meals/:userId', create);

  app.delete('/meals/:mealId', deleteController)
  app.put('/meals/:mealId', update)
  app.get('/meals/search/:mealId', searchMealController)
}