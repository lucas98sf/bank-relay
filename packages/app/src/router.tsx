import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./components/layout";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Dashboard } from "./pages/dashboard";
import { Transactions } from "./pages/transactions";
import { SendMoney } from "./pages/send-money";
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
        element: <Accounts />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "send",
        element: <SendMoney />,
      },
    ],
  },
]);

export default router;
