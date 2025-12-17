"use client";

import { createContext, useContext } from "react";

type UserContextType = {
  username: string;
  setUsername: (username: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

// Custom hook to use the context
export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
