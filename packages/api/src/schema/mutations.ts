import { builder } from "./builder";
import { prisma } from "../db";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import {
  AccountNotFoundError,
  AuthenticationError,
  InsufficientFundsError,
  InvalidCredentialsError,
  UserExistsError,
} from "../errors";

builder.mutationField("sendTransaction", (t) =>
  t.prismaField({
    type: "Transaction",
    args: {
      amount: t.arg.int({ required: true, validate: { positive: true } }),
      fromAccountId: t.arg.string({ required: true }),
      toAccountId: t.arg.string({ required: true }),
    },
    errors: {
      types: [
        ZodError,
        AuthenticationError,
        AccountNotFoundError,
        InsufficientFundsError,
      ],
    },
    resolve: async (
      query,
      _root,
      { amount, fromAccountId, toAccountId },
      ctx
    ) => {
      if (!ctx.user) {
        throw new AuthenticationError();
      }

      const fromAccount = await prisma.account.findUnique({
        where: { id: fromAccountId, userId: ctx.user.id },
      });

      if (!fromAccount) {
        throw new AccountNotFoundError(
          "From account not found or unauthorized"
        );
      }

      const toAccount = await prisma.account.findUnique({
        where: { id: toAccountId },
      });

      if (!toAccount) {
        throw new AccountNotFoundError("To account not found");
      }

      if (fromAccount.balance < amount) {
        throw new InsufficientFundsError();
      }

      return await prisma
        .$transaction([
          prisma.transaction.create({
            ...query,
            data: {
              amount,
              fromAccountId,
              toAccountId,
            },
          }),
          prisma.account.update({
            where: { id: fromAccountId },
            data: { balance: { decrement: amount } },
          }),
          prisma.account.update({
            where: { id: toAccountId },
            data: { balance: { increment: amount } },
          }),
        ])
        .then((results) => results[0]);
    },
  })
);

builder.mutationField("register", (t) =>
  t.field({
    type: "String",
    args: {
      email: t.arg.string({ required: true, validate: { email: true } }),
      password: t.arg.string({
        required: true,
        validate: { minLength: 8 },
      }),
    },
    errors: {
      types: [ZodError, UserExistsError],
    },
    resolve: async (_, { email, password }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new UserExistsError();
      }

      const hashedPassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          accounts: {
            create: {
              balance: 1000,
            },
          },
        },
      });

      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    },
  })
);

builder.mutationField("login", (t) =>
  t.field({
    type: "String",
    args: {
      email: t.arg.string({ required: true, validate: { email: true } }),
      password: t.arg.string({
        required: true,
      }),
    },
    errors: {
      types: [ZodError, InvalidCredentialsError],
    },
    resolve: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new InvalidCredentialsError();
      }

      const validPassword = await compare(password, user.password);

      if (!validPassword) {
        throw new InvalidCredentialsError();
      }

      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    },
  })
);