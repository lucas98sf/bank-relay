import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { graphql, useMutation } from "react-relay";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { loginMutation } from "@/__generated__/loginMutation.graphql";

const mutation = graphql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on MutationLoginSuccess {
        data
      }
      ... on Error {
        error
      }
    }
  }
`;

export function Login() {
  const [commit] = useMutation<loginMutation>(mutation);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    commit({
      variables: {
        email,
        password,
      },
      onCompleted: (response) => {
        if (response.login?.data) {
          setAuth(true, response.login.data);
          navigate(from, { replace: true });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: response.login?.error,
          });
        }
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
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
              Login
            </Button>
            <Button
              onClick={() => {
                navigate("/register");
              }}
              className="w-full"
              variant="secondary"
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
