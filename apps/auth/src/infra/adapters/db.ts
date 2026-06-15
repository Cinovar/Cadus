import 'dotenv/config'
import { PrismaClient } from '../database/generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({
  connectionString: process.env.NEON_DATABASE_URL_AUTH!,
})

export const prisma = new PrismaClient({ adapter })
