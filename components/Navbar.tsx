import Link from "next/link";
import { brand } from "@/config/brand";
import { getSession } from "@/lib/session";
import { signOut } from "@/app/(auth)/actions";

export async function Navbar() {
  const session = await getSession();

  return (
    <header className="border-b border-white/5">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm font-bold">
            {brand.name[0]}
          </span>
          {brand.name}
        </Link>

        <div className="flex items-center gap-2 text-sm">
          {session ? (
            <>
              <Link href="/dashboard" className="rounded-lg px-3 py-2 text-zinc-300 hover:bg-white/5 hover:text-white">
                Dashboard
              </Link>

              <form action={signOut}>
                <button className="rounded-lg px-3 py-2 text-zinc-300 hover:bg-white/5 hover:text-white">
                  Sign out
                </button>
              </form>
            </>
          ) : (
              <>
                <Link href="/login" className="rounded-lg px-3 py-2 text-zinc-300 hover:bg-white/5 hover:text-white">
                  Sign in
                </Link>

                <Link href="/signup" className="rounded-lg bg-accent px-4 py-2 font-medium hover:bg-accent-hover">
                  Sign up
                </Link>
              </>
          )}
        </div>
      </nav>
    </header>
  );
}
