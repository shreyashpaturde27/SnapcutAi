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
  name: z.string().trim().min(2, "Enter your name").max(60),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
});
type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — SnapCut AI" },
      { name: "description", content: "Create your free SnapCut AI account in seconds." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { signUp, signInWithGoogle } = useAuth();
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
      await signUp(values.email, values.password, values.name);
      toast.success("Account created! Welcome to SnapCut AI.");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Could not create account.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="5 free cuts every day. No credit card."
      footer={
        <>
          Have an account?{" "}
          <Link to="/login" className="text-foreground hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-base font-medium">Name</Label>
          <Input id="name" autoComplete="name" className="h-12 text-base" {...register("name")} />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="text-base font-medium">Email</Label>
          <Input id="email" type="email" autoComplete="email" className="h-12 text-base" {...register("email")} />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password" className="text-base font-medium">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" className="h-12 text-base" {...register("password")} />
          {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>}
        </div>
        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
          disabled={submitting}
        >
          {submitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Create account
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
