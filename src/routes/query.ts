import { FastifyInstance } from 'fastify'

import prisma from '../db/db_client'
import { IQuery } from './schemas/query.interface'
import { ApiError } from '../errors'

async function queryRoutes(app: FastifyInstance) {
  const log = app.log.child({ component: 'queryRoutes' })

  // Create a new query
  app.post<{
    Body: {
      title: string
      description?: string
      formDataId: string
    }
    Reply: IQuery
  }>('', {
    async handler(req, reply) {
      const { title, description, formDataId } = req.body
      log.debug({ title, formDataId }, 'create query')
      try {
        // Check if form data exists
        const formData = await prisma.formData.findUnique({
          where: { id: formDataId },
        })
        if (!formData) {
          throw new ApiError('Form data not found', 404)
        }

        // Check if query already exists for this form data
        const existingQuery = await prisma.query.findUnique({
          where: { formDataId },
        })
        if (existingQuery) {
          throw new ApiError('Query already exists for this form data', 400)
        }

        const query = await prisma.query.create({
          data: {
            title,
            description,
            formDataId,
          },
        })
        reply.code(201).send(query)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('Failed to create query', 400)
      }
    },
  })

  // Update an existing query by ID
}

export default queryRoutes
