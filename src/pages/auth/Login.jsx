import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <GlassCard className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-soft">
            <HeartPulse className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-text-main">
              VetOS Pro
            </h1>
            <p className="text-sm text-text-secondary">
              Staff access placeholder
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-main">
              Email
            </label>
            <input
              className="w-full rounded-2xl border border-white/70 bg-white/55 px-4 py-3 outline-none focus:border-primary"
              placeholder="admin@vetos.com"
              type="email"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-main">
              Password
            </label>
            <input
              className="w-full rounded-2xl border border-white/70 bg-white/55 px-4 py-3 outline-none focus:border-primary"
              placeholder="Password"
              type="password"
            />
          </div>
          <Link
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(233,120,58,0.25)]"
            to="/app/overview"
          >
            Enter dashboard
          </Link>
        </div>

        <Link
          className="mt-5 inline-flex text-sm font-semibold text-primary-dark"
          to="/forgot-password"
        >
          Forgot password?
        </Link>
      </GlassCard>
    </div>
  );
}
