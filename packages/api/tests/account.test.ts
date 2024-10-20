import { describe, it, expect } from "vitest";
import { createTestClient, gql } from "./utils";
import { createTestUser, createTestTransaction } from "./setup";
import * as jwt from "jsonwebtoken";

describe("Accounts", () => {
  const GET_ACCOUNTS_QUERY = gql`
    query GetAccounts {
      accounts {
        ... on QueryAccountsSuccess {
          data {
            edges {
              node {
                id
                balance
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
            totalCount
          }
        }
        ... on Error {
          __typename
          error
        }
      }
    }
  `;

  const GET_TRANSACTIONS_QUERY = gql`
    query GetTransactions($accountId: String!) {
      transactions(accountId: $accountId) {
        ... on QueryTransactionsSuccess {
          data {
            edges {
              node {
                id
                amount
                fromAccount {
                  id
                }
                toAccount {
                  id
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
            totalCount
          }
        }
      }
    }
  `;

  it("should list user accounts", async () => {
    const user = await createTestUser();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

    const client = createTestClient(token);

    const response = await client.query(GET_ACCOUNTS_QUERY);

    expect(response.errors).toBeUndefined();
    expect(response.data?.accounts.data.edges).toHaveLength(1);
    expect(response.data?.accounts.data.edges[0].node).toMatchObject({
      balance: 10000,
    });
  });

  it("should list account transactions", async () => {
    const sender = await createTestUser("sender@example.com");
    const receiver = await createTestUser("receiver@example.com");

    await createTestTransaction(
      sender.accounts[0].id,
      receiver.accounts[0].id,
      5000
    );

    const token = jwt.sign({ userId: sender.id }, process.env.JWT_SECRET!);

    const client = createTestClient(token);

    const response = await client.query(GET_TRANSACTIONS_QUERY, {
      accountId: sender.accounts[0].id,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.transactions.data.edges).toHaveLength(1);
    expect(response.data?.transactions.data.edges[0].node).toMatchObject({
      amount: 5000,
    });
  });

  it("should require authentication for account access", async () => {
    const client = createTestClient();

    const response = await client.query(GET_ACCOUNTS_QUERY);

    expect(response.data?.accounts.__typename).toBe("AuthenticationError");
  });
});
