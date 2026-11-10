import Link from "next/link";
import { brand } from "@/config/brand";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const { userId } = await requireUser();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, profile: { select: { username: true, views: true } } },
  });

  const profile = user?.profile;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-zinc-400">Signed in as {user?.email}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Profile views" value={profile?.views ?? 0} />
        <Stat label="Links" value="-" />
        <Stat label="Status" value={profile ? "Live" : "Not set up"} />
      </div>

      <section className="mt-8 rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
        {profile ? (
          <>
            <h2 className="font-medium">Your page</h2>
            <p className="mt-1 font-mono text-sm text-zinc-400">
              {brand.domain}/<span className="text-accent">{profile.username}</span>
            </p>

            <Link
              href={`/${profile.username}`}
              className="mt-4 inline-block rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            >
              View page
            </Link>
          </>
        ) : (
          <>
            <h2 className="font-medium">You haven&apos;t claimed a username yet</h2>
            <p className="mt-1 text-sm text-zinc-400">Pick one to get your page live.</p>

              <Link
                href="/onboarding"
                className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium hover:bg-accent-hover"
              >
                Claim a username
            </Link>
          </>
        )}
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
