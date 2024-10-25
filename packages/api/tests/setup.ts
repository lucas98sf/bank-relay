import { MongoMemoryReplSet } from "mongodb-memory-server";
import { beforeAll, afterAll, beforeEach } from "vitest";
import { prisma } from "../src/db";

let mongoServer: MongoMemoryReplSet;

beforeAll(async () => {
  mongoServer = await MongoMemoryReplSet.create({
    replSet: { count: 3 },
  });
  const mongoUri = mongoServer.getUri() + "?authSource=admin";
  process.env.DATABASE_URL = mongoUri;
});

beforeEach(async () => {
  await prisma.transaction.deleteMany({ where: {} });
  await prisma.account.deleteMany({ where: {} });
  await prisma.user.deleteMany({ where: {} });
});

afterAll(async () => {
  await prisma.$disconnect();
  await mongoServer.stop();
});

// Test utilities
export async function createTestUser(
  email = "test@example.com",
  password = "password123"
) {
  return prisma.user.create({
    data: {
      email,
      password,
      accounts: {
        create: {
          balance: 10000, // $100.00 in cents
        },
      },
    },
    include: {
      accounts: true,
    },
  });
}

export async function createTestTransaction(
  fromAccountId: string,
  toAccountId: string,
  amount: number
) {
  return prisma.transaction.create({
    data: {
      amount,
      fromAccountId,
      toAccountId,
    },
  });
}
