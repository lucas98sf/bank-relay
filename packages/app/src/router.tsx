import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./components/layout";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Dashboard } from "./pages/dashboard";
import { Transactions } from "./pages/transactions";
import { SendMoney } from "./pages/send-money";
import { AuthGuard } from "./components/AuthGuard";
import { Accounts } from "@/pages/accounts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "accounts",
        element: (
          <AuthGuard>
            <Accounts />
          </AuthGuard>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        ),
      },
      {
        path: "transactions",
        element: (
          <AuthGuard>
            <Transactions />
          </AuthGuard>
        ),
      },
      {
        path: "send",
        element: (
          <AuthGuard>
            <SendMoney />
          </AuthGuard>
        ),
      },
    ],
  },
]);

export default router;
