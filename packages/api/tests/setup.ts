import { afterAll, beforeEach } from "vitest";
import { prisma } from "../src/db";

beforeEach(async () => {
  await prisma.transaction.deleteMany({ where: {} });
  await prisma.account.deleteMany({ where: {} });
  await prisma.user.deleteMany({ where: {} });
});

afterAll(async () => {
  await prisma.$disconnect();
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
