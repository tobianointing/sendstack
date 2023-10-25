import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const app_secret = request.cookies.get("app_secret");
  const loggedIn = request.cookies.get("loggedIn");

  const isLoggedIn = JSON.parse(loggedIn?.value.toLocaleLowerCase() || "false");

  if (!app_secret?.value || !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
