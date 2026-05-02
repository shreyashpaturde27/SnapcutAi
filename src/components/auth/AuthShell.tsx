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
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo className="h-9" />
        </div>
        <Card className="glass p-7 shadow-card-elev">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="mt-6">{children}</div>
        </Card>
        {footer && (
          <p className="mt-5 text-center text-sm text-muted-foreground">{footer}</p>
        )}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
