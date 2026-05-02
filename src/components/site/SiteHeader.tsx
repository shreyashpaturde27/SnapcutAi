import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { LayoutDashboard, LogOut } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function SiteHeader() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 glass">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-12">
          <Logo />
          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" className="h-10 text-base">
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-2.5 h-5 w-5" />
                  Dashboard
                </Link>
              </Button>
              <div className="h-5 w-px bg-border/60" />
              <Button variant="ghost" size="icon" onClick={signOut} aria-label="Sign out" className="h-10 w-10 text-muted-foreground hover:text-destructive">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden h-10 text-base sm:inline-flex">
                <Link to="/login">Log in</Link>
              </Button>
              <Button
                asChild
                className="h-11 bg-gradient-brand px-6 text-base font-semibold text-primary-foreground shadow-glow hover:opacity-95"
              >
                <Link to="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
