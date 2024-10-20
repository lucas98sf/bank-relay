/* eslint-disable */
import type { Prisma, User, Account, Transaction } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "accounts";
        ListRelations: "accounts";
        Relations: {
            accounts: {
                Shape: Account[];
                Name: "Account";
                Nullable: false;
            };
        };
    };
    Account: {
        Name: "Account";
        Shape: Account;
        Include: Prisma.AccountInclude;
        Select: Prisma.AccountSelect;
        OrderBy: Prisma.AccountOrderByWithRelationInput;
        WhereUnique: Prisma.AccountWhereUniqueInput;
        Where: Prisma.AccountWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "sentTransactions" | "receivedTransactions";
        ListRelations: "sentTransactions" | "receivedTransactions";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            sentTransactions: {
                Shape: Transaction[];
                Name: "Transaction";
                Nullable: false;
            };
            receivedTransactions: {
                Shape: Transaction[];
                Name: "Transaction";
                Nullable: false;
            };
        };
    };
    Transaction: {
        Name: "Transaction";
        Shape: Transaction;
        Include: Prisma.TransactionInclude;
        Select: Prisma.TransactionSelect;
        OrderBy: Prisma.TransactionOrderByWithRelationInput;
        WhereUnique: Prisma.TransactionWhereUniqueInput;
        Where: Prisma.TransactionWhereInput;
        Create: {};
        Update: {};
        RelationName: "fromAccount" | "toAccount";
        ListRelations: never;
        Relations: {
            fromAccount: {
                Shape: Account;
                Name: "Account";
                Nullable: false;
            };
            toAccount: {
                Shape: Account;
                Name: "Account";
                Nullable: false;
            };
        };
    };
}