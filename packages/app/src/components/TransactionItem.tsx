import { FC } from "react";
import { graphql, useFragment } from "react-relay";
import { Card, CardContent } from "@/components/ui/card";
import { TransactionItem_transaction$key } from "@/__generated__/TransactionItem_transaction.graphql";

const transactionFragment = graphql`
  fragment TransactionItem_transaction on Transaction {
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
`;

interface TransactionItemProps {
  transaction?: TransactionItem_transaction$key | null;
}

export const TransactionItem: FC<TransactionItemProps> = ({ transaction }) => {
  const data = useFragment(transactionFragment, transaction);
  const accountId = localStorage.getItem("accountId");

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              {new Date(data?.createdAt).toLocaleString()}
            </p>
            <p>
              From: {data?.fromAccount?.user?.email}
              <br />
              To: {data?.toAccount?.user?.email}
            </p>
          </div>
          <p
            className={`text-xl font-bold ${
              data?.fromAccount?.id === accountId
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {data?.fromAccount?.id === accountId ? "-" : "+"}$
            {((data?.amount ?? 0) / 100).toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
