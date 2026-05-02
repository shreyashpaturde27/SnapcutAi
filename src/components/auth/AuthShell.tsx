import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/site/Logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="bg-hero-glow absolute inset-0 -z-10" />
      <div className="w-full max-w-lg">
        <div className="mb-10 flex justify-center scale-110">
          <Logo />
        </div>
        <Card className="glass p-10 shadow-card-elev sm:p-14">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="mt-10">{children}</div>
        </Card>
        {footer && (
          <p className="mt-8 text-center text-lg text-muted-foreground">{footer}</p>
        )}
        <p className="mt-8 text-center text-base text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
