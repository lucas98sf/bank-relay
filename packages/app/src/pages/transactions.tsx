import { FC, Suspense } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Button } from "@/components/ui/button";
import { transactionsQuery } from "@/__generated__/transactionsQuery.graphql";
import { useState } from "react";
import { TransactionItem } from "@/components/TransactionItem";

const query = graphql`
  query transactionsQuery($accountId: String!, $first: Int!, $after: String) {
    transactions(accountId: $accountId, first: $first, after: $after) {
      ... on QueryTransactionsSuccess {
        data {
          edges {
            cursor
            node {
              ...TransactionItem_transaction
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
          <TransactionItem key={node.id} transaction={node} />
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
