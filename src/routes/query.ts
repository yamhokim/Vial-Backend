import { FastifyInstance } from 'fastify'

import prisma from '../db/db_client'
import { IQuery } from './schemas/query.interface'
import { ApiError } from '../errors'

async function queryRoutes(app: FastifyInstance) {
  const log = app.log.child({ component: 'queryRoutes' })

  // Get a specific query by ID
  app.get<{
    Params: { id: string }
    Reply: IQuery
  }>('/:id', {
    async handler(req, reply) {
      const { id } = req.params
      log.debug({ id }, 'get query by id')
      try {
        const query = await prisma.query.findUnique({
          where: { id },
        })
        if (!query) {
          throw new ApiError('Query not found', 404)
        }
        reply.send(query)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('Failed to fetch query', 400)
      }
    },
  })
}

export default queryRoutes
