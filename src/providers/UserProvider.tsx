"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type UserPreferences = {
  isFirstTime: boolean;
};

type UserContextType = {
  name: string;
  email: string;
  image: string;
  preferences: UserPreferences;
  setPreferences: (prefs: UserPreferences) => void;
  userData: any;
  setUserData: (cv: any) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const [preferences, setPreferences] = useState<UserPreferences>({
    isFirstTime: true,
  });

  const [userData, setUserData] = useState<any>({
    personalInformation: {
      birthDate: "",
      city: "",
      country: "",
    },
    professionalDetails: {
      specialty: "",
      currentLevel: "",
      yearsExperience: "",
      summary: "",
    },
    abilities: {
      skills: [],
      languages: [],
    },
  });

  useEffect(() => {
    if (session) {
      // Load user preferences from a data source, e.g., Firebase
    }
  }, [session]);

  return (
    <UserContext.Provider
      value={{
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        image: session?.user?.image || "",
        preferences,
        setPreferences,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
