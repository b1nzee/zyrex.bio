"use server";

import { hash, hashSync, compare } from "bcrypt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";

type State = { error?: string } | undefined;

const DUMMY_HASH = hashSync("dummy-password", 12);

function readForm(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  };
}

export async function signUp(_: State, formData: FormData): Promise<State> {
  const { email, password } = readForm(formData);

  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Enter a valid email" };
  if (password.length < 8) return { error: "Password must be at least 8 characters" };
  if (Buffer.byteLength(password) > 72) return { error: "Password is too long" };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "That email is already registered" };

  const passwordHash = await hash(password, 12);
  const user = await prisma.user.create({ data: { email, passwordHash } });

  await createSession(user.id);
  redirect("/onboarding");
}

export async function signIn(_: State, formData: FormData): Promise<State> {
  const { email, password } = readForm(formData);

  const user = await prisma.user.findUnique({ where: { email } });
  const valid = await compare(password, user?.passwordHash ?? DUMMY_HASH);

  if (!user || !valid) return { error: "Invalid email or password" };

  await createSession(user.id);
  redirect("/dashboard");
}

export async function signOut() {
  await deleteSession();
  redirect("/login");
}
