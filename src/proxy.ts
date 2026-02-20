import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

type UserRole = "PATIENT" | "DOCTOR" | "CLINIC_ADMIN";

export const ROLE_ROUTE_MAP: Record<UserRole, string[]> = {
  PATIENT: ["/dashboard", "/doctors", "/appointments"],
  DOCTOR: ["/dashboard", "/appointments", "/doctors", "/patients"],
  CLINIC_ADMIN: ["/dashboard", "/appointments", "/doctors", "/patients"],
};

const PROTECTED_ROUTES = ["/dashboard", "/appointments", "/doctors", "/patients"];

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const publicRoutes = ["/", "/login", "/signup", "/auth/forgot-password", "/auth/callback"];
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/auth/");

  if (!user && !isPublicRoute) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (user && PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

    const role = profile?.role as UserRole | undefined;

    if (!role) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const allowedRoutes = ROLE_ROUTE_MAP[role];

    const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
