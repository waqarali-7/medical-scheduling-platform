"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

const PATH_TITLE_MAP: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/doctors": "Doctors",
  "/patients": "Patients",
  "/appointments": "Appointment",
  "/clinics": "Clinics",
  "/appointments/new": "Appointment",
  "/clinics/new": "Clinic",
};

function getTitleFromPathname(pathname: string): string {
  if (PATH_TITLE_MAP[pathname]) return PATH_TITLE_MAP[pathname];
  if (pathname.startsWith("/doctors/")) return "Doctors";
  if (pathname.startsWith("/appointments/")) return "Appointment";
  if (pathname.startsWith("/clinics/")) return "Clinic";
  return "";
}

type PageTitleContextValue = {
  title: string;
  setTitle: (title: string | null) => void;
};

const PageTitleContext = createContext<PageTitleContextValue | null>(null);

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [override, setOverride] = useState<string | null>(null);

  const title = useMemo(
    () => override ?? getTitleFromPathname(pathname),
    [pathname, override]
  );

  const setTitle = useCallback((value: string | null) => {
    setOverride(value);
  }, []);

  const value = useMemo(() => ({ title, setTitle }), [title, setTitle]);

  return (
    <PageTitleContext.Provider value={value}>{children}</PageTitleContext.Provider>
  );
}

export function usePageTitle() {
  const ctx = useContext(PageTitleContext);
  return ctx?.title ?? "";
}

export function useSetPageTitle() {
  const ctx = useContext(PageTitleContext);
  return ctx?.setTitle ?? (() => {});
}

/** Call from a page to set a custom title (e.g. clinic name). */
export function SetPageTitle({ title }: { title: string }) {
  const setTitle = useSetPageTitle();
  useEffect(() => {
    setTitle(title);
    return () => setTitle(null);
  }, [title, setTitle]);
  return null;
}
