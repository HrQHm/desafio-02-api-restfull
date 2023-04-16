import { makeSearchMealByIdUseCase } from "@/use-cases/factories/make-search-meal-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchMealController(request: FastifyRequest, reply: FastifyReply) {
  const searchMealParamSchema = z.object({
    mealId: z.string().uuid()
  })

  const { mealId } = searchMealParamSchema.parse(request.params);

  const searchMealByIdUseCase = makeSearchMealByIdUseCase()
  const meals = await searchMealByIdUseCase.execute({
    mealId
  })

  return reply.status(200).send({
    meals
  })
}