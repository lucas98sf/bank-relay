import { RelayEnvironmentProvider } from "react-relay";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { RelayEnvironment } from "./RelayEnvironment";
import router from "./router";

export default function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <RouterProvider router={router} />
      <Toaster />
    </RelayEnvironmentProvider>
  );
}
