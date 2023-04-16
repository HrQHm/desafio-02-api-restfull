import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { UserHasNoMealError } from "@/use-cases/errors/user-has-no-meal";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function userMetrics(request: FastifyRequest, reply: FastifyReply) {
  const userMetricsParamSchema = z.object({
    userId: z.string().uuid()
  })

  const { userId } = userMetricsParamSchema.parse(request.params)

  try {
    const getUserMetricsUseCase = makeGetUserMetricsUseCase()

    const metrics = await getUserMetricsUseCase.execute({
      userId
    })

    return reply.status(201).send({
      metrics
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    } else if (err instanceof UserHasNoMealError) {
      return reply.status(409).send()
    }
    return reply.status(500).send()
  }
}