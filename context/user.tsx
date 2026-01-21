"use client";

import { UserType } from "@/types/user";
import { createContext, useContext, useState, ReactNode } from "react";

const UserContext = createContext<{
  user: UserType | undefined;
  setUser: (u: UserType) => void;
}>({
  user: undefined,
  setUser: () => {},
});

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: UserType;
}) {
  const [user, setUser] = useState(initialUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
