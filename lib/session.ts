import "server-only";

import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET = process.env.JWT_SECRET!;
const COOKIE = "session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function createSession(userId: string) {
  const token = sign({}, SECRET, {
    subject: userId,
    algorithm: "HS256",
    expiresIn: MAX_AGE,
  });

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getSession() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;

  try {
    const payload = verify(token, SECRET, { algorithms: ["HS256"] });
    if (typeof payload === "string" || !payload.sub) return null;

    return { userId: payload.sub };
  } catch {
    return null;
  }
}

export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

export async function deleteSession() {
  (await cookies()).delete(COOKIE);
}
