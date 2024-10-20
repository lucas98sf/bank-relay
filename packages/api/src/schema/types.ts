import { builder } from "./builder";

export const User = builder.prismaNode("User", {
  id: { field: "id" },
  fields: (t) => ({
    email: t.exposeString("email"),
    accounts: t.relation("accounts"),
  }),
});

export const Account = builder.prismaNode("Account", {
  id: { field: "id" },
  fields: (t) => ({
    balance: t.exposeInt("balance"),
    user: t.relation("user"),
    sentTransactions: t.relation("sentTransactions"),
    receivedTransactions: t.relation("receivedTransactions"),
  }),
});

export const Transaction = builder.prismaNode("Transaction", {
  id: { field: "id" },
  fields: (t) => ({
    amount: t.exposeInt("amount"),
    fromAccount: t.relation("fromAccount"),
    toAccount: t.relation("toAccount"),
    createdAt: t.expose("createdAt", { type: "Date" }),
  }),
});
