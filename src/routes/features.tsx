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
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Everything you need for <span className="text-gradient-brand">clean cutouts</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Built for creators and teams that ship visual work daily.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f) => (
            <Card key={f.title} className="glass p-6 transition-shadow hover:shadow-glow">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-brand-soft border border-border/60">
                <f.icon className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
          >
            <Link to="/register">Start free</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
