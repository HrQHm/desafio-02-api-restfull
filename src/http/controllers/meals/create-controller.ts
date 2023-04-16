import { makeCreateMealUseCase } from "@/use-cases/factories/make-create-meal-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createMealParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    on_diet: z.boolean(),
    date_meal: z.string()
  })

  const { userId } = createMealParamsSchema.parse(request.params)
  const { name, description, on_diet, date_meal } = createBodySchema.parse(request.body)

  try {
    const createMealUseCase = makeCreateMealUseCase();
    await createMealUseCase.execute({
      name,
      description,
      date_meal,
      on_diet,
      user_id: userId
    })
  } catch (err) {
    return reply.status(500).send()
  }

  return reply.status(201).send()
}