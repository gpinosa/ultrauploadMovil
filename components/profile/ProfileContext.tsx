import { createContext, useContext, useState, ReactNode } from "react";

interface ProfileData {
  username: string;
  bio: string;
  website: string;
  profileImage: string;
  socialLinks: {
    linkedin: string;
    instagram: string;
    twitter: string;
    github: string;
  };
}

interface ProfileContextType {
  profileData: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "gerard",
    bio: "¡Hola! Soy un entusiasta de la tecnología y el desarrollo web. Me encanta aprender nuevas habilidades y compartir conocimientos con la comunidad.",
    website: "",
    profileImage: "https://via.placeholder.com/150",
    socialLinks: {
      linkedin: "",
      instagram: "",
      twitter: "",
      github: "",
    },
  });

  const updateProfile = (newData: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
