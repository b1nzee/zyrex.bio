"use client";

import Link from "next/link";
import { useActionState } from "react";

type State = { error?: string } | undefined;
type Action = (state: State, formData: FormData) => Promise<State>;

export function AuthForm({ mode, action }: { mode: "login" | "signup"; action: Action }) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const isLogin = mode === "login";

  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur">
      <h1 className="text-2xl font-semibold">
        {isLogin ? "Welcome back" : "Create your account"}
      </h1>

      <p className="mt-1 text-sm text-zinc-400">
        {isLogin ? "Sign in to manage your page." : "Claim your page in seconds."}
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete={isLogin ? "current-password" : "new-password"}
          placeholder={isLogin ? "Your password" : "At least 8 characters"}
          minLength={isLogin ? undefined : 8}
        />

        {state?.error && (
          <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {state.error}
          </p>
        )}

        <button
          disabled={pending}
          className="w-full rounded-lg bg-accent py-2.5 font-medium transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        {isLogin ? "No account yet?" : "Already have an account?"}
        <Link href={isLogin ? "/signup" : "login"} className="font-medium text-accent hover:underline">
          {isLogin ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-zinc-300">{label}</span>

      <input
        required
        {...props}
        className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py2.5 text-sm outline-none transition placeholder:text-zinc-600 focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}
