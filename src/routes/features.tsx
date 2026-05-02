import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wand2, Zap, ShieldCheck, Layers, ImageIcon, Sparkles, Cpu, Globe,
} from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — SnapCut AI" },
      {
        name: "description",
        content:
          "Discover SnapCut AI's features: sub-5s background removal, hair-level accuracy, batch processing, and a developer-friendly API.",
      },
      { property: "og:title", content: "Features — SnapCut AI" },
      {
        property: "og:description",
        content: "Sub-5s AI cutouts, hair-level accuracy, batch processing, and a clean API.",
      },
    ],
  }),
  component: FeaturesPage,
});

const items = [
  { icon: Zap, title: "Sub-5s processing", desc: "Edge-optimized inference for instant results." },
  { icon: Wand2, title: "Hair-level masks", desc: "Handles wisps, fur, glass, and motion blur." },
  { icon: Layers, title: "Batch uploads", desc: "Process up to 100 images at a time." },
  { icon: ImageIcon, title: "5000×5000 output", desc: "Print-ready resolution out of the box." },
  { icon: ShieldCheck, title: "Auto-delete in 24h", desc: "Zero retention. Your files never linger." },
  { icon: Sparkles, title: "Transparent PNG", desc: "Drop into any design tool with no extra steps." },
  { icon: Cpu, title: "REST API", desc: "Wire SnapCut into your pipeline with a single key." },
  { icon: Globe, title: "Global CDN", desc: "Low-latency delivery from anywhere in the world." },
];

function FeaturesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Everything you need for <span className="text-gradient-brand">clean cutouts</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground sm:text-2xl">
            Built for creators and teams that ship visual work daily.
          </p>
        </div>
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <Card key={f.title} className="glass p-10 transition-all duration-300 hover:shadow-glow hover:scale-[1.02]">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand-soft border border-border/60">
                <f.icon className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="mt-8 text-2xl font-bold tracking-tight">{f.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Button
            asChild
            size="xl"
            className="h-14 px-10 text-lg font-semibold bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
          >
            <Link to="/register">Start free</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
