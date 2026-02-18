import AppShell from "@/components/layout/AppShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointment",
};

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return <AppShell title="Appointment">{children}</AppShell>;
}
