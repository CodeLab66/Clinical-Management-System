import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <GlassCard className="w-full max-w-md">
        <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
          <Mail className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="font-heading text-2xl font-bold text-text-main">
          Reset access
        </h1>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          Password recovery is a placeholder until authentication workflows are
          implemented.
        </p>
        <input
          className="mt-6 w-full rounded-2xl border border-white/70 bg-white/55 px-4 py-3 outline-none focus:border-primary"
          placeholder="Email address"
          type="email"
        />
        <Link
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(233,120,58,0.25)]"
          to="/login"
        >
          Back to login
        </Link>
      </GlassCard>
    </div>
  );
}
