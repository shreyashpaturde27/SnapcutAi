import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "Contact Us — SnapCut AI" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Contact <span className="text-gradient-brand">Us</span></h1>
          <p className="mt-4 text-muted-foreground">Any questions or remarks? Just write us a message!</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card className="glass p-8">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <p className="mt-2 text-sm text-muted-foreground">Fill out the form and our team will get back to you within 24 hours.</p>
            
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">support@snapcut.ai</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Trade Name</p>
                  <p className="text-sm font-medium">SnapCut AI Solutions</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium">123 AI Street, Tech Park, Bangalore, KA, 560001, India</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass p-8">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input className="w-full rounded-md border border-border/60 bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input className="w-full rounded-md border border-border/60 bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input className="w-full rounded-md border border-border/60 bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea className="min-h-[120px] w-full rounded-md border border-border/60 bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="How can we help?" />
              </div>
              <button className="w-full rounded-md bg-gradient-brand py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-opacity hover:opacity-90">
                Send Message
              </button>
            </form>
          </Card>
        </div>
      </section>
    </SiteShell>
  );
}
