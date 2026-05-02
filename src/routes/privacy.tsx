import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — SnapCut AI" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-4xl font-bold">Privacy <span className="text-gradient-brand">Policy</span></h1>
        <p className="mt-4 text-muted-foreground">Last updated: May 02, 2026</p>

        <div className="prose prose-invert mt-10 max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p className="mt-3">
              SnapCut AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our background removal services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
            <div className="mt-3 space-y-4">
              <p><strong>Personal Data:</strong> We may collect personal information such as your name, email address, and billing information when you register for an account or make a purchase.</p>
              <p><strong>Image Data:</strong> When you use our service, we temporarily process the images you upload. We do not store your original or processed images longer than necessary to complete the requested service.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p className="mt-3">
              We use the information we collect to provide and maintain our services, process your transactions, communicate with you, and improve our AI algorithms for better background removal accuracy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
            <p className="mt-3">
              We implement industry-standard security measures to protect your personal data. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Third-Party Services</h2>
            <p className="mt-3">
              We use third-party services like Razorpay for payment processing and Cloudinary for image management. These third parties have their own privacy policies governing how they handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Contact Us</h2>
            <p className="mt-3">
              If you have any questions about this Privacy Policy, please contact us at support@snapcut.ai.
            </p>
          </section>
        </div>
      </section>
    </SiteShell>
  );
}
