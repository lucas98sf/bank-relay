import { useNavigate } from "react-router-dom";
import { graphql, useMutation } from "react-relay";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { registerMutation } from "@/__generated__/registerMutation.graphql";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const mutation = graphql`
  mutation registerMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      ... on MutationRegisterSuccess {
        data
      }
      ... on ZodError {
        __typename
        error
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationForm> = (data) => {
    commit({
      variables: {
        email: data.email,
        password: data.password,
      },
      onCompleted: (response) => {
        if (response.register?.data) {
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
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
