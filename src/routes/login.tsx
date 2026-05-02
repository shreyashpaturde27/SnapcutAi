import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
});
type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — SnapCut AI" },
      { name: "description", content: "Log in to your SnapCut AI account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      await signIn(values.email, values.password);
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Could not sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Log in to SnapCut"
      subtitle="Welcome back. Cut some backgrounds."
      footer={
        <>
          New here?{" "}
          <Link to="/register" className="text-foreground hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-base font-medium">Email</Label>
          <Input id="email" type="email" autoComplete="email" className="h-12 text-base" {...register("email")} />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="password" title="password" className="text-base font-medium">Password</Label>
            <Link to="/forgot-password" title="forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
              Forgot?
            </Link>
          </div>
          <Input id="password" type="password" autoComplete="current-password" className="h-12 text-base" {...register("password")} />
          {errors.password && (
            <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
          disabled={submitting}
        >
          {submitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Sign in
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/60" />
          </div>
          <div className="relative flex justify-center text-sm uppercase font-medium">
            <span className="bg-card/0 px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full h-12 text-base font-medium"
          onClick={async () => {
            await signInWithGoogle();
            toast.success("Signed in with Google");
            navigate({ to: "/dashboard" });
          }}
        >
          Continue with Google
        </Button>
      </form>
    </AuthShell>
  );
}
