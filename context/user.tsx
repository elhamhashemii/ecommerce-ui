"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const UserContext = createContext<{
  user: any | undefined;
  setUser: (u: any) => void;
}>({
  user: undefined,
  setUser: () => {},
});

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: any;
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
