"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getAppTheme } from "@/theme";
import { ThemeProviderWrapper, useThemeMode } from "@/context/ThemeContext";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import { PageTitleProvider, usePageTitle } from "@/context/PageTitleContext";
import AppShell from "./AppShell";
import type { User } from "@/types";
import { QueryProvider } from "@/providers/QueryProvider";

const AUTH_ROUTES = ["/", "/login", "/signup"];

function InnerTheme({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={getAppTheme(mode)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

function AppShellWithTitle({ children }: { children: ReactNode }) {
  const title = usePageTitle();
  return <AppShell title={title}>{children}</AppShell>;
}

interface AppLayoutProps {
  user: User | null;
  children: ReactNode;
}

/**
 * Single root wrapper (Convert-style): shell for app routes, plain children for auth routes.
 * Keeps sidebar + header mounted on navigation so only the main content area updates.
 */
export default function AppLayout({ user, children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isAuthRoute && !user) {
      router.replace("/login");
    }
  }, [isAuthRoute, user, router]);

  if (!isAuthRoute && !user) {
    return null;
  }

  if (isAuthRoute) {
    return (
      <ThemeProviderWrapper>
        <InnerTheme>{children}</InnerTheme>
      </ThemeProviderWrapper>
    );
  }

  return (
    <QueryProvider>
      <ThemeProviderWrapper>
        <InnerTheme>
          <CurrentUserProvider user={user}>
            <PageTitleProvider>
              <AppShellWithTitle>{children}</AppShellWithTitle>
            </PageTitleProvider>
          </CurrentUserProvider>
        </InnerTheme>
      </ThemeProviderWrapper>
    </QueryProvider>
  );
}
