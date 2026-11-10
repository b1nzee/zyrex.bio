import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AuthForm } from "@/components/AuthForm";
import { signUp } from "../actions";

export default async function SignUpPage() {
  if (await getSession()) redirect("/dashboard");

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <AuthForm mode="signup" action={signUp} />
    </main>
  );
}
