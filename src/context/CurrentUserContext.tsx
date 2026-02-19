"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { User } from "@/types";

type CurrentUserContextValue = User | null;

const CurrentUserContext = createContext<CurrentUserContextValue>(null);

export function CurrentUserProvider({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) {
  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser(): User | null {
  return useContext(CurrentUserContext);
}
