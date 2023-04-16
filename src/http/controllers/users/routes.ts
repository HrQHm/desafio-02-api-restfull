import { FastifyInstance } from "fastify";
import { register } from "./register-controller";
import { listMealsByUser } from "./list-meals-by-user-controller";
import { userMetrics } from "./user-metrics-controller";

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.get('/users/list/:userId', listMealsByUser)
  app.get('/users/metrics/:userId', userMetrics)
}