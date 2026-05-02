import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, Zap, ShieldCheck, Image as ImageIcon, Layers } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnapCut AI — Instant AI Background Removal" },
      {
        name: "description",
        content:
          "Cut backgrounds in under 5 seconds with SnapCut AI. Pixel-perfect cutouts for product shots, portraits, and creative work.",
      },
      { property: "og:title", content: "SnapCut AI — Instant AI Background Removal" },
      {
        property: "og:description",
        content: "Pixel-perfect AI cutouts in seconds. Built for creators and teams.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <SiteShell>
      <Hero />
      <LogoStrip />
      <Features />
      <HowItWorks />
      <FinalCta />
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-hero-glow absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-24 text-center sm:pt-28">
        <Badge className="bg-gradient-brand-soft border-border/60 text-foreground">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          Powered by next-gen segmentation AI
        </Badge>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Remove image backgrounds in{" "}
          <span className="text-gradient-brand">under 5 seconds</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
          SnapCut AI gives you pixel-perfect cutouts for product photos,
          portraits, and creative work — no Photoshop required.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
          >
            <Link to="/register">Try it free</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-border/80">
            <Link to="/features">See features</Link>
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          5 free images per day · No credit card required
        </p>

        {/* Preview card */}
        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute -inset-x-6 -inset-y-4 -z-10 bg-gradient-brand-soft blur-3xl" />
          <Card className="glass overflow-hidden p-2 shadow-card-elev">
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-[4/3] rounded-md bg-[radial-gradient(circle_at_30%_20%,oklch(0.4_0.1_265),oklch(0.18_0.04_265))] p-4">
                <div className="flex h-full items-end">
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Original</p>
                    <p className="mt-1 text-sm text-foreground">portrait.jpg</p>
                  </div>
                </div>
              </div>
              <div
                className="aspect-[4/3] rounded-md p-4"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, oklch(0.22 0.03 265) 25%, transparent 25%), linear-gradient(-45deg, oklch(0.22 0.03 265) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, oklch(0.22 0.03 265) 75%), linear-gradient(-45deg, transparent 75%, oklch(0.22 0.03 265) 75%)",
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
                }}
              >
                <div className="flex h-full items-end">
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">SnapCut</p>
                    <p className="mt-1 text-sm text-foreground">portrait.png · transparent</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  const labels = ["Shopify Sellers", "Indie Studios", "Marketing Teams", "Photographers", "Agencies"];
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </section>
  );
}

const features = [
  {
    icon: Zap,
    title: "Sub-5s processing",
    desc: "Edge-optimized inference returns transparent PNGs faster than you can refresh.",
  },
  {
    icon: Wand2,
    title: "Hair-level accuracy",
    desc: "Trained for fly-aways, fur, and translucent edges that other tools mangle.",
  },
  {
    icon: Layers,
    title: "Batch & API ready",
    desc: "Drop hundreds of images or wire SnapCut into your pipeline via REST.",
  },
  {
    icon: ImageIcon,
    title: "Up to 5000×5000",
    desc: "High-resolution output suitable for print, packshots, and large displays.",
  },
  {
    icon: ShieldCheck,
    title: "Auto-deletes in 24h",
    desc: "We never keep your files. Process, download, and the data is gone.",
  },
  {
    icon: Sparkles,
    title: "JPG · PNG · WEBP",
    desc: "All major formats supported, transparent PNG by default for instant reuse.",
  },
];

function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Built for speed and precision</h2>
        <p className="mt-3 text-muted-foreground">
          Everything you need to ship clean cutouts at scale.
        </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="glass p-6 transition-shadow hover:shadow-glow">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-brand-soft border border-border/60">
              <f.icon className="h-5 w-5 text-secondary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Upload", d: "Drag & drop a JPG, PNG, or WEBP up to 10 MB." },
    { n: "02", t: "Process", d: "Our AI isolates the subject in seconds." },
    { n: "03", t: "Download", d: "Grab a transparent PNG, ready for anywhere." },
  ];
  return (
    <section className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Three steps. That's it.</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.n} className="glass p-6">
              <p className="font-display text-3xl text-gradient-brand">{s.n}</p>
              <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <Card className="glass relative overflow-hidden p-10 text-center shadow-card-elev">
        <div className="bg-hero-glow absolute inset-0 -z-10 opacity-60" />
        <h2 className="text-3xl font-bold sm:text-4xl">Start cutting in seconds</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          5 free images every day. Upgrade when you're ready.
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
          >
            <Link to="/register">Create free account</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
