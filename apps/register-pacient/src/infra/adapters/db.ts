import { PrismaClient } from "../database/generated/prisma/client.ts";
import { PrismaNeon } from "@prisma/adapter-neon";

function getDatabaseUrl(): string {
  const url = process.env.NEON_DATABASE_URL;

  if (!url) {
    throw new Error(
      "DATABASE_URL is not defined. Verify the.env file of the register servicr.",
    );
  }

  return url;
}

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaNeon({ connectionString: getDatabaseUrl() });
  return new PrismaClient({ adapter });
}

declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
