import { Suspense } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { accountsQuery } from "@/__generated__/accountsQuery.graphql";

const query = graphql`
  query accountsQuery($first: Int!, $after: String) {
    allAccounts(first: $first, after: $after) {
      ... on QueryAllAccountsSuccess {
        data {
          edges {
            cursor
            node {
              _id
              id
              balance
              user {
                email
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

const AccountsList = () => {
  const [after, setAfter] = useState<string | null>(null);
  const data = useLazyLoadQuery<accountsQuery>(query, {
    first: 10,
    after,
  });

  if (data.allAccounts && !("data" in data.allAccounts)) {
    return <div>Error: {data.allAccounts.error}</div>;
  }

  const { edges, pageInfo } = data.allAccounts?.data ?? {
    edges: [],
    pageInfo: { hasNextPage: false, endCursor: null },
  };

  const loadMore = () => {
    setAfter(pageInfo.endCursor ?? null);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Accounts</h1>
      <div className="space-y-4">
        {edges?.map((edge) => (
          <Card
            key={edge?.node?.id}
            className={
              localStorage.getItem("accountId") === edge?.node?._id
                ? "bg-slate-300"
                : ""
            }
          >
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl text-gray-700">
                    Account ID: {edge?.node?._id}
                  </div>
                  <div className="text-2xl text-gray-500">
                    Email: {edge?.node?.user?.email}
                  </div>
                </div>
                <p className="text-4xl font-bold">
                  ${((edge?.node?.balance ?? 0) / 100).toFixed(2)}
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

export function Accounts() {
  return (
    <Suspense fallback="Loading...">
      <AccountsList />
    </Suspense>
  );
}
