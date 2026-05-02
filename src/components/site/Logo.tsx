import { Link } from "@tanstack/react-router";
import { Scissors } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-3 ${className}`}>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-violet">
        <Scissors className="h-5 w-5 text-primary-foreground" />
        <div className="absolute -inset-1 rounded-xl bg-gradient-brand opacity-0 blur-sm transition-opacity group-hover:opacity-50" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="flex items-center text-xl font-bold tracking-tight">
          <span className="text-gradient-brand">Snap</span>
          <span className="text-foreground">Cut</span>
          <span className="ml-1.5 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-primary ring-1 ring-primary/20">
            AI
          </span>
        </span>
        <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-[0.15em]">
          Magic Background Remover
        </span>
      </div>
    </Link>
  );
}
