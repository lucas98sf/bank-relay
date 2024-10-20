import { describe, it, expect } from "vitest";
import { createTestClient, gql } from "./utils";
import { createTestUser } from "./setup";
import * as jwt from "jsonwebtoken";

describe("Transactions", () => {
  const SEND_TRANSACTION_MUTATION = gql`
    mutation SendTransaction(
      $amount: Int!
      $fromAccountId: String!
      $toAccountId: String!
    ) {
      sendTransaction(
        amount: $amount
        fromAccountId: $fromAccountId
        toAccountId: $toAccountId
      ) {
        ... on MutationSendTransactionSuccess {
          data {
            id
            amount
            fromAccount {
              id
              balance
            }
            toAccount {
              id
              balance
            }
          }
        }
        ... on Error {
          __typename
          error
        }
      }
    }
  `;

  const GET_ACCOUNT_QUERY = gql`
    query GetAccount($id: String!) {
      account(id: $id) {
        ... on QueryAccountSuccess {
          data {
            id
            balance
          }
        }
        ... on Error {
          __typename
          error
        }
      }
    }
  `;

  it("should successfully send a transaction", async () => {
    const sender = await createTestUser("sender@example.com");
    const receiver = await createTestUser("receiver@example.com");

    const token = jwt.sign({ userId: sender.id }, process.env.JWT_SECRET!);

    const client = createTestClient(token);

    const input = {
      amount: 5000, // $50.00
      fromAccountId: sender.accounts[0].id,
      toAccountId: receiver.accounts[0].id,
    };

    const response = await client.query(SEND_TRANSACTION_MUTATION, input);
    expect(response.errors).toBeUndefined();
    expect(response.data?.sendTransaction.data.amount).toBe(5000);

    const senderAccountResponse = await client.query(GET_ACCOUNT_QUERY, {
      id: sender.accounts[0].id,
    });
    expect(senderAccountResponse.data.account.data.balance).toBe(5000); // $50.00 remaining

    const receiverToken = jwt.sign(
      { userId: receiver.id },
      process.env.JWT_SECRET!
    );
    const receiverClient = createTestClient(receiverToken);

    const receiverAccountResponse = await receiverClient.query(
      GET_ACCOUNT_QUERY,
      {
        id: receiver.accounts[0].id,
      }
    );
    expect(receiverAccountResponse.data.account.data.balance).toBe(15000); // $150.00 total
  });

  it("should not send transaction with insufficient funds", async () => {
    const sender = await createTestUser("sender@example.com");
    const receiver = await createTestUser("receiver@example.com");

    const token = jwt.sign({ userId: sender.id }, process.env.JWT_SECRET!);

    const client = createTestClient(token);

    const input = {
      amount: 20000, // $200.00 (more than available balance)
      fromAccountId: sender.accounts[0].id,
      toAccountId: receiver.accounts[0].id,
    };

    const response = await client.query(SEND_TRANSACTION_MUTATION, input);

    expect(response.data?.sendTransaction.data).toBeUndefined();
    expect(response.data?.sendTransaction.__typename).toBe(
      "InsufficientFundsError"
    );

    // Verify balances remained unchanged
    const senderAccountResponse = await client.query(GET_ACCOUNT_QUERY, {
      id: sender.accounts[0].id,
    });
    expect(senderAccountResponse.data.account.data.balance).toBe(10000);

    const receiverToken = jwt.sign(
      { userId: receiver.id },
      process.env.JWT_SECRET!
    );
    const receiverClient = createTestClient(receiverToken);

    const receiverAccountResponse = await receiverClient.query(
      GET_ACCOUNT_QUERY,
      {
        id: receiver.accounts[0].id,
      }
    );
    expect(receiverAccountResponse.data.account.data.balance).toBe(10000);
  });
});
