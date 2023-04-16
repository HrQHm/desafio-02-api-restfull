import { makeDeleteMealUseCase } from "@/use-cases/factories/make-delete-meal-use-case";
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"


export async function deleteController(request: FastifyRequest, reply: FastifyReply) {
  const deleteMealParamShema = z.object({
    mealId: z.string().uuid()
  })

  const { mealId } = deleteMealParamShema.parse(request.params);

  const deleteMealUseCase = makeDeleteMealUseCase();
  await deleteMealUseCase.execute({ mealId })

  return reply.status(200).send()
}