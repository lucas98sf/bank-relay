import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import ValidationPlugin from "@pothos/plugin-validation";
import ErrorsPlugin from "@pothos/plugin-errors";
import type PrismaTypes from "../prisma/pothos-types";
import { DateResolver } from "graphql-scalars";
import { prisma } from "../db";
import { createContext } from "../context";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: Awaited<ReturnType<typeof createContext>>;
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
}>({
  plugins: [ErrorsPlugin, ValidationPlugin, PrismaPlugin, RelayPlugin],
  relay: {
    clientMutationId: "omit",
    cursorType: "String",
  },
  errors: {
    defaultTypes: [Error],
  },
  prisma: {
    client: prisma,
  },
});

builder.addScalarType("Date", DateResolver);

builder.globalConnectionField("totalCount", (t) =>
  t.int({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    resolve: (parent) => parent.totalCount,
  })
);

builder.queryType({});
builder.mutationType({});
