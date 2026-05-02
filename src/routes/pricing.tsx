import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — SnapCut AI" },
      {
        name: "description",
        content:
          "Simple SnapCut AI pricing: free tier with 5 images/day, Pro for unlimited, and credit packs for bursts.",
      },
      { property: "og:title", content: "Pricing — SnapCut AI" },
      {
        property: "og:description",
        content: "Free, Pro, and credit packs. Simple, transparent pricing.",
      },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    cta: "Start free",
    features: ["5 images per day", "Up to 5MP", "Standard processing", "JPG · PNG · WEBP"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    cta: "Go Pro",
    features: [
      "Unlimited images",
      "Up to 25MP (5000×5000)",
      "Priority queue",
      "Batch uploads",
      "Email support",
    ],
    highlight: true,
  },
  {
    name: "Credit Pack",
    price: "$9",
    period: "/500 cuts",
    cta: "Buy credits",
    features: ["No subscription", "Credits never expire", "Same quality as Pro", "API access"],
    highlight: false,
  },
];

function PricingPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Simple <span className="text-gradient-brand">pricing</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <Card
              key={t.name}
              className={`relative p-7 ${
                t.highlight
                  ? "glass shadow-glow border-primary/40"
                  : "glass"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-2.5 left-6 rounded-full bg-gradient-brand px-3 py-0.5 text-xs font-medium text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 w-full ${
                  t.highlight
                    ? "bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
                    : ""
                }`}
                variant={t.highlight ? "default" : "outline"}
              >
                <Link to="/register">{t.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
