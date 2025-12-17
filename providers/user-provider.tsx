// providers/user-provider.tsx
"use client";

import { useState, useEffect, type ReactNode } from "react";
import { UserContext } from "@/contexts/user-context";

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    // Read from localStorage on mount
    const stored = localStorage.getItem("POOF_USER");
    if (stored) {
      setUsername(stored);
    }
  }, []);

  // Sync to localStorage when username changes
  useEffect(() => {
    if (username) {
      localStorage.setItem("POOF_USER", username);
    }
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
