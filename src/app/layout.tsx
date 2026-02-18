"use client";

import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getAppTheme } from "@/theme";
import { ThemeProviderWrapper, useThemeMode } from "@/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function InnerTheme({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={getAppTheme(mode)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProviderWrapper>
          <InnerTheme>{children}</InnerTheme>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
