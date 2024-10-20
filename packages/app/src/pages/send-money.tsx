import { useState } from "react";
import { graphql, useMutation } from "react-relay";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { sendMoneyMutation } from "@/__generated__/sendMoneyMutation.graphql";

const sendTransactionMutation = graphql`
  mutation sendMoneyMutation(
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
        }
      }
      ... on Error {
        __typename
        error
      }
    }
  }
`;

export function SendMoney() {
  const [commit] = useMutation<sendMoneyMutation>(sendTransactionMutation);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [toAccount, setToAccount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amountInCents = Math.round(parseFloat(amount) * 100);

    commit({
      variables: {
        amount: amountInCents,
        fromAccountId: localStorage.getItem("accountId") ?? "",
        toAccountId: toAccount,
      },
      onCompleted: (response) => {
        if (response.sendTransaction?.data?.amount) {
          toast({
            title: "Success",
            description: `Successfully sent $${(
              response.sendTransaction.data.amount / 100
            ).toFixed(2)}`,
          });
          navigate("/transactions");
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: response.sendTransaction?.error,
          });
        }
      },
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Recipient Account ID"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
