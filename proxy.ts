import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  try {
    if (token) {
      verify(token, process.env.JWT_SECRET!, { algorithms: ["HS256"] });
      return NextResponse.next();
    }
  } catch { }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = { matcher: ["/dashboard/:path", "/onboarding"] };
