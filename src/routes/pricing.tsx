import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

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
    price: "0",
    period: "/forever",
    cta: "Start free",
    features: ["5 images per day", "Up to 5MP", "Standard processing", "JPG · PNG · WEBP"],
    highlight: false,
    type: "free",
  },
  {
    name: "Pro",
    price: "11100", // Price in INR (₹111)
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
    type: "pro",
  },
  {
    name: "Credit Pack",
    price: "4900", // Price in INR (₹49)
    period: "/500 cuts",
    cta: "Buy credits",
    features: ["No subscription", "Credits never expire", "Same quality as Pro", "API access"],
    highlight: false,
    type: "credits",
  },
];

function PricingPage() {
  const { user, isAuthenticated, updateUserPlan } = useAuth();
  const navigate = useNavigate();

  const handlePayment = (tier: (typeof tiers)[0]) => {
    if (!isAuthenticated) {
      toast.error("Please login to upgrade your plan");
      navigate({ to: "/login" });
      return;
    }

    if (tier.type === "free") {
      navigate({ to: "/dashboard" });
      return;
    }

    const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

    console.log("Initializing Razorpay with Key:", RAZORPAY_KEY ? `${RAZORPAY_KEY.substring(0, 12)}...` : "UNDEFINED");

    if (!RAZORPAY_KEY) {
      toast.error("Razorpay Key ID is missing. Please restart your development server.");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not found. Check your internet or ad-blocker.");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: parseInt(tier.price), // Convert string to number
      currency: "INR",
      name: "SnapCut AI",
      description: `Upgrade to ${tier.name}`,
      // Removed broken image link to prevent loading errors
      handler: function (response: any) {
        if (response.razorpay_payment_id) {
          toast.success(`Payment successful! Welcome to ${tier.name}.`);
          if (tier.type === "pro") {
            updateUserPlan("pro");
          }
          navigate({ to: "/dashboard" });
        }
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
      },
      theme: {
        color: "#0EA5FF",
      },
      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled.");
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment failed to initialize. Please try again.");
      console.error("Razorpay Error:", error);
    }
  };

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
              className={`relative p-7 ${t.highlight
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
                <span className="text-4xl font-bold">₹{parseInt(t.price) / 100}</span>
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
                onClick={() => handlePayment(t)}
                className={`mt-8 w-full ${t.highlight
                    ? "bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
                    : ""
                  }`}
                variant={t.highlight ? "default" : "outline"}
              >
                {t.cta}
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
