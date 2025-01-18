import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  avatar: string;
  setAvatar: (url: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [avatar, setAvatar] = useState(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yfq3HpgVfQjZ3LB3lbTezmwwQ9VypQ.png"
  );

  return (
    <UserContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
