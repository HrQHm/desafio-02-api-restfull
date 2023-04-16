import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeUpdateMealUseCase } from "@/use-cases/factories/make-update-meal-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateParamSchema = z.object({
    mealId: z.string().uuid()
  })

  const updateBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    on_diet: z.boolean(),
    date_meal: z.string(),
  })

  const { mealId } = updateParamSchema.parse(request.params);
  const { name, description, on_diet, date_meal } = updateBodySchema.parse(request.body)

  try {

    const updateMealUseCase = makeUpdateMealUseCase();

    const meal = await updateMealUseCase.execute({
      id: mealId,
      date_meal,
      description,
      name,
      on_diet,
    })

    return reply.status(204).send({
      meal
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }
    return reply.status(500).send()
  }
}