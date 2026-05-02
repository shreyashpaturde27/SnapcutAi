import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [{ title: "Refund and Cancellation Policy — SnapCut AI" }],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-4xl font-bold">Refund and <span className="text-gradient-brand">Cancellation</span></h1>
        <p className="mt-4 text-muted-foreground">Last updated: May 02, 2026</p>

        <div className="prose prose-invert mt-10 max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Cancellation Policy</h2>
            <p className="mt-3">
              You can cancel your Pro subscription at any time through your dashboard. Upon cancellation, your subscription will remain active until the end of the current billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Refund Eligibility</h2>
            <p className="mt-3">
              We offer a 7-day money-back guarantee for first-time Pro subscriptions. If you are not satisfied with our service, you can request a full refund within 7 days of your initial purchase.
            </p>
            <p className="mt-2">
              Credit packs are non-refundable once any credits from the pack have been used.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Processing Refunds</h2>
            <p className="mt-3">
              To request a refund, please email us at support@snapcut.ai with your account details and the reason for the request. Approved refunds will be processed via Razorpay within 5-7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Exceptions</h2>
            <p className="mt-3">
              Refunds will not be provided for accounts that have violated our Terms and Conditions or for users who have exceeded a reasonable number of background removals during the 7-day period.
            </p>
          </section>
        </div>
      </section>
    </SiteShell>
  );
}
