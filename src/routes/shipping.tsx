import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [{ title: "Shipping and Delivery Policy — SnapCut AI" }],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-4xl font-bold">Shipping and <span className="text-gradient-brand">Delivery</span></h1>
        <p className="mt-4 text-muted-foreground">Last updated: May 02, 2026</p>

        <div className="prose prose-invert mt-10 max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Digital Delivery</h2>
            <p className="mt-3">
              SnapCut AI provides digital services. There is no physical shipping involved. All services, including background removal and account upgrades, are delivered digitally through our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Delivery Timeline</h2>
            <p className="mt-3">
              Upon successful payment for a Pro subscription or credit pack, your account will be upgraded instantly. You will receive an email confirmation of your purchase, and your new limits will be reflected in your dashboard immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Service Availability</h2>
            <p className="mt-3">
              Our background removal service is available 24/7, subject to planned maintenance and unforeseen technical issues. We strive to maintain high uptime to ensure you can access our services whenever you need them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Contact Information</h2>
            <p className="mt-3">
              If you experience any issues with the digital delivery of our services, please contact us immediately at support@snapcut.ai.
            </p>
          </section>
        </div>
      </section>
    </SiteShell>
  );
}
