import AppShell from "@/components/layout/AppShell";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import { getCurrentUser } from "@/lib/supabase/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctors",
};

export default async function DoctorsLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <CurrentUserProvider user={currentUser}>
      <AppShell title="Doctors">{children}</AppShell>
    </CurrentUserProvider>
  );
}
