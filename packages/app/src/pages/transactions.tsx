import { FC, Suspense } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { transactionsQuery } from "@/__generated__/transactionsQuery.graphql";
import { useState } from "react";

const query = graphql`
  query transactionsQuery($accountId: String!, $first: Int!, $after: String) {
    transactions(accountId: $accountId, first: $first, after: $after) {
      ... on QueryTransactionsSuccess {
        data {
          edges {
            cursor
            node {
              id
              amount
              createdAt
              fromAccount {
                id
                user {
                  email
                }
              }
              toAccount {
                id
                user {
                  email
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
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

const TransactionsList: FC = () => {
  const [after, setAfter] = useState<string | null>(null);
  const data = useLazyLoadQuery<transactionsQuery>(query, {
    accountId: localStorage.getItem("accountId") ?? "",
    first: 10,
    after,
  });

  if (data.transactions && !("data" in data.transactions)) {
    return <div>Error: {data.transactions.error}</div>;
  }

  const { edges, pageInfo } = data.transactions?.data ?? {
    edges: [],
    pageInfo: { hasNextPage: false, endCursor: null },
  };

  const loadMore = () => {
    setAfter(pageInfo.endCursor ?? null);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <div className="space-y-4">
        {edges?.map(({ node }) => (
          <Card key={node.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(node.createdAt).toLocaleString()}
                  </p>
                  <p>
                    From: {node.fromAccount.user.email}
                    <br />
                    To: {node.toAccount.user.email}
                  </p>
                </div>
                <p
                  className={`text-xl font-bold ${
                    node.fromAccount.id === localStorage.getItem("accountId")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {node.fromAccount.id === localStorage.getItem("accountId")
                    ? "-"
                    : "+"}
                  ${(node.amount / 100).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
        {pageInfo.hasNextPage && (
          <Button onClick={loadMore} className="w-full" variant="outline">
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export function Transactions() {
  return (
    <Suspense fallback="Loading...">
      <TransactionsList />
    </Suspense>
  );
}
