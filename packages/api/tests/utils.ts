/* eslint-disable @typescript-eslint/no-explicit-any */
import { createYoga } from "graphql-yoga";
import { schema } from "../src/schema";
import { createContext } from "../src/context";
import { ExecutionResult } from "graphql";

export function createTestClient(token?: string) {
  const yoga = createYoga({
    schema,
    context: createContext({
      cookies: {
        get: (_: string) => token,
        set: () => {},
      },
    } as any),
  });

  return {
    async query<T = any>(
      query: string,
      variables?: Record<string, any>
    ): Promise<ExecutionResult<T>> {
      const response = await yoga.fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      return response.json();
    },
  };
}

export const gql = String.raw;
