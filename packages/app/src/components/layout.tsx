import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {token && (
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <nav className="flex gap-4">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/transactions">Transactions</Link>
              <Link to="/accounts">Accounts</Link>
              <Link to="/send">Send Money</Link>
            </nav>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>
      )}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
