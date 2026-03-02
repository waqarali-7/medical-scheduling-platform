import type {ReactNode} from "react";
import {Geist, Geist_Mono} from "next/font/google";
import {getCurrentUser} from "@/lib/supabase/data";
import AppLayout from "@/components/layout/AppLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({children}: {children: ReactNode}) {
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <AppLayout user={user}>{children}</AppLayout>
      </body>
    </html>
  );
}
