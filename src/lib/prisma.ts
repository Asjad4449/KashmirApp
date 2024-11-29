// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: log database queries
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
