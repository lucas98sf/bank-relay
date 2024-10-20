import { builder } from "./builder";
import { prisma } from "../db";
import { ZodError } from "zod";
import { AccountNotFoundError, AuthenticationError } from "../errors";

builder.queryField("account", (t) =>
  t.prismaField({
    type: "Account",
    args: {
      id: t.arg.string({ required: true }),
    },
    errors: {
      types: [ZodError, AuthenticationError, AccountNotFoundError],
    },
    resolve: async (query, _root, { id }, ctx) => {
      if (!ctx.user) {
        throw new AuthenticationError();
      }

      const account = await prisma.account.findUnique({
        ...query,
        where: { id },
      });

      if (!account || account.userId !== ctx.user.id) {
        throw new AccountNotFoundError();
      }

      return account;
    },
  })
);

builder.queryField("accounts", (t) =>
  t.prismaConnection({
    type: "Account",
    cursor: "id",
    errors: {
      types: [AuthenticationError],
    },
    resolve: async (query, _root, _args, ctx) => {
      if (!ctx.user) {
        throw new AuthenticationError();
      }

      return prisma.account.findMany({
        ...query,
        where: { userId: ctx.user.id },
      });
    },
  })
);

builder.queryField("transactions", (t) =>
  t.prismaConnection({
    type: "Transaction",
    cursor: "id",
    args: {
      accountId: t.arg.string({ required: true }),
    },
    errors: {
      types: [ZodError, AuthenticationError, AccountNotFoundError],
    },
    resolve: async (query, _root, { accountId }, ctx) => {
      if (!ctx.user) {
        throw new AuthenticationError();
      }

      const account = await prisma.account.findUnique({
        where: { id: accountId },
      });

      if (!account || account.userId !== ctx.user.id) {
        throw new AccountNotFoundError();
      }

      return prisma.transaction.findMany({
        ...query,
        where: {
          OR: [{ fromAccountId: accountId }, { toAccountId: accountId }],
        },
      });
    },
  })
);
