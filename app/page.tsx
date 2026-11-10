import Link from "next/link";
import { brand } from "@/config/brand";
import { getSession } from "@/lib/session";

export default async function HomePage() {
  const session = await getSession();

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center px-4 text-center">
      {session ? <LoggedIn /> : <LoggedOut />}
    </main>
  );
}

function LoggedOut() {
  return (
    <>
      <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">{brand.tagline}</h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-400">
        Build a profile with your links, socials, music and more. Free, fast, and fully yours.
      </p>

      <div className="mt-8 flex items-center rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 font-mono text-sm">
        <span className="text-zinc-500">{brand.domain}/</span>
        <span className="text-accent">yourname</span>
      </div>

      <div className="mt-8 flex gap-3">
        <Link href="/signup" className="rounded-lg bg-accent px-6 py-3 font-medium hover:bg-accent-hover">
          Claim your page
        </Link>

        <Link href="/login" className="rounded-lg border border-white/10 px-6 py-3 font-medium hover:bg-white/5">
          Sign in
        </Link>
      </div>
    </>
  );
}

function LoggedIn() {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight">Welcome back!</h1>
      <p className="mt-3 text-zinc-400">Your page is waiting. Jump back in and make it yours.</p>
      <Link href="/dashboard" className="mt-8 rounded-lg bg-accent px-6 py-3 font-medium hover:bg-accent-hover">
        Go to dashboard
      </Link>
    </>
  );
}
