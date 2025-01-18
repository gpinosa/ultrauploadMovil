import React, { createContext, useContext, useState } from "react";

interface SocialLinks {
  linkedin: string;
  github: string;
  instagram: string;
  twitter: string;
}

interface ProfileContextType {
  bio: string;
  setBio: (bio: string) => void;
  website: string;
  setWebsite: (website: string) => void;
  socialLinks: SocialLinks;
  setSocialLinks: (socialLinks: SocialLinks) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    linkedin: "",
    github: "",
    instagram: "",
    twitter: "",
  });

  const value = {
    bio,
    setBio,
    website,
    setWebsite,
    socialLinks,
    setSocialLinks,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
