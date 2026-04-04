import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
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

  const visibleLinks = navLinks.filter((link) => {
    if (link.protected && !isAuthenticated) return false;
    if (link.adminOnly && user?.role !== "admin") return false;
    return true;
  });

  return (
    <nav className="sticky top-0 z-50 border-b border-border/20 bg-gradient-to-r from-card/95 to-card/90 backdrop-blur-xl shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-300 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-accent to-primary shadow-lg shadow-primary/20 ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-300">
            <span className="font-heading text-lg font-extrabold text-white leading-none tracking-tight">E</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-2xl font-extrabold tracking-tight gradient-text">EventHub</span>
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Events that connect</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {visibleLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-sm font-semibold transition-all duration-300 py-2 group ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {location.pathname === link.to ? (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
              ) : (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              )}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-4 border-l border-border/30 pl-8">
              <div className="text-right hidden sm:block pr-3">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">
                  {user?.role === "admin" ? "Admin" : "User"}
                </p>
                <p className="text-sm font-bold text-foreground">{user?.fullName}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="rounded-full gap-2 hover:bg-destructive/15 hover:text-destructive transition-all duration-200 text-muted-foreground font-semibold hover:scale-105"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button
                size="sm"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-md hover:shadow-lg font-semibold hover:scale-105 text-white"
              >
                Login
              </Button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-foreground hover:text-primary transition-colors duration-300 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/30 bg-gradient-to-b from-card to-card/95 backdrop-blur-lg px-6 py-4 md:hidden animate-slideInLeft">
          <div className="flex flex-col gap-3">
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  location.pathname === link.to
                    ? "text-primary bg-primary/10 border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="pt-4 border-t border-border/30 mt-4">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                  {user?.role === "admin" ? "Admin" : "User"}
                </p>
                <p className="text-sm font-bold text-foreground mb-4">{user?.fullName}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="w-full rounded-lg gap-2 hover:bg-destructive/15 hover:text-destructive transition-all duration-200 font-semibold"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button
                  size="sm"
                  className="w-full rounded-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 font-semibold text-white"
                >
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
