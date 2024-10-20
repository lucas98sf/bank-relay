import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { graphql, useMutation } from "react-relay";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { registerMutation } from "@/__generated__/registerMutation.graphql";

const mutation = graphql`
  mutation registerMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      ... on MutationRegisterSuccess {
        data
      }
      ... on Error {
        __typename
        error
      }
    }
  }
`;

export function Register() {
  const [commit] = useMutation<registerMutation>(mutation);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    commit({
      variables: {
        email,
        password,
      },
      onCompleted: (response) => {
        if (response.register?.data) {
          localStorage.setItem("token", response.register.data);
          navigate("/dashboard");
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: response.register?.error,
          });
        }
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
