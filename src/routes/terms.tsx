import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms and Conditions — SnapCut AI" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-4xl font-bold">Terms and <span className="text-gradient-brand">Conditions</span></h1>
        <p className="mt-4 text-muted-foreground">Last updated: May 02, 2026</p>

        <div className="prose prose-invert mt-10 max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Agreement to Terms</h2>
            <p className="mt-3">
              By accessing or using SnapCut AI, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Use of Service</h2>
            <p className="mt-3">
              You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. User Content</h2>
            <p className="mt-3">
              You retain all rights to the images you upload. By using our service, you grant us a limited license to process your images solely for the purpose of providing the background removal service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Prohibited Activities</h2>
            <p className="mt-3">
              You agree not to use the service for any illegal purposes, including the processing of images that infringe upon intellectual property rights or violate any laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Payments and Refunds</h2>
            <p className="mt-3">
              All payments are processed through Razorpay. Fees for our services are non-refundable except as expressly stated in our Refund Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Limitation of Liability</h2>
            <p className="mt-3">
              SnapCut AI shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the service.
            </p>
          </section>
        </div>
      </section>
    </SiteShell>
  );
}
