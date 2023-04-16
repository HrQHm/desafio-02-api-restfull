import { makeListMealsByUserUseCase } from "@/use-cases/factories/make-list-meals-by-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listMealsByUser(request: FastifyRequest, reply: FastifyReply) {
  const listMealsByUserParamSchema = z.object({
    userId: z.string().uuid()
  })

  const { userId } = await listMealsByUserParamSchema.parse(request.params)

  const listMealsByUserUseCase = makeListMealsByUserUseCase()
  const meals = await listMealsByUserUseCase.execute({ user_id: userId })

  return reply.status(200).send({ meals })
}