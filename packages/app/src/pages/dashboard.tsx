import { Suspense, useEffect } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { dashboardQuery } from "@/__generated__/dashboardQuery.graphql";
import { useNavigate } from "react-router-dom";

const query = graphql`
  query dashboardQuery {
    accounts(first: 1) {
      ... on QueryAccountsSuccess {
        data {
          edges {
            node {
              _id
              id
              balance
            }
          }
        }
      }
    }
  }
`;

function DashboardContent() {
  const navigate = useNavigate();
  const data = useLazyLoadQuery<dashboardQuery>(query, {});

  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  useEffect(() => {
    localStorage.setItem(
      "accountId",
      data.accounts?.data?.edges?.[0]?.node?._id ?? ""
    );
  }, [data.accounts?.data?.edges]);

  const account = data.accounts?.data?.edges?.[0]?.node;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            ${((account?.balance ?? 0) / 100).toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function Dashboard() {
  return (
    <Suspense fallback="Loading...">
      <DashboardContent />
    </Suspense>
  );
}
