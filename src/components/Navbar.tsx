import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface NavLink {
  label: string;
  to: string;
  protected?: boolean;
  adminOnly?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Dashboard", to: "/dashboard", protected: true },
  { label: "Admin Panel", to: "/organizer-dashboard", protected: true, adminOnly: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const visibleLinks = navLinks.filter(link => {
    if (link.protected && !isAuthenticated) return false;
    if (link.adminOnly && user?.role !== 'admin') return false;
    return true;
  });

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-heading text-sm font-bold text-primary-foreground">E</span>
          </div>
          <span className="font-heading text-lg font-semibold text-foreground">
            Eventix
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {visibleLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-3 border-l border-border pl-8">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-medium text-muted-foreground">
                  {user?.role === 'admin' ? '🔑 Admin' : '👤 Attendee'}
                </p>
                <p className="text-sm font-medium text-foreground">{user?.fullName}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="rounded-full gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="rounded-full px-6 hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    {user?.role === 'admin' ? '🔑 Admin' : '👤 Attendee'}
                  </p>
                  <p className="text-sm font-medium text-foreground mb-3">{user?.fullName}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="w-full rounded-full gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full rounded-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
