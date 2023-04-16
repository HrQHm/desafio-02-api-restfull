import fastify from 'fastify';
import { userRoutes } from './http/controllers/users/routes';
import { mealsRoutes } from './http/controllers/meals/routes';
import { ZodError } from 'zod'
import { env } from './env'

export const server = fastify();

server.register(userRoutes);
server.register(mealsRoutes)

server.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // should log to an external tool like datadog
  }

  return reply.status(500).send({ message: 'Internal Server Error.' })
})
