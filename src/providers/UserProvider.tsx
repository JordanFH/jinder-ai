"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createDocument, fetchDocumentByCondition } from "@/firebase/utils";

type UserPreferences = {
  isFirstTime: boolean;
  explored: {
    jobs: string[];
    courses: string[];
  };
  saved: {
    jobs: string[];
    courses: string[];
  };
};

type UserContextType = {
  name: string;
  email: string;
  image: string;
  country: string;
  city: string;
  preferences: UserPreferences;
  setPreferences: (prefs: UserPreferences) => void;
  userData: any;
  setUserData: (cv: any) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const createUser = async (newUser: any) => {
  await createDocument("users", newUser);
};

const getUserByEmail = async (email: string) => {
  const user = await fetchDocumentByCondition("users", "email", email);
  return user;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const [personalInformation, setPersonalInformation] = useState({
    country: "",
    city: "",
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    isFirstTime: true,
    explored: {
      jobs: [],
      courses: [],
    },
    saved: {
      jobs: [],
      courses: [],
    },
  });

  const [userData, setUserData] = useState<any>({
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

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  fetch("https://api.bigdatacloud.net/data/reverse-geocode-client")
    .then((response) => response.json())
    .then((data) => {
      setCountry(data.countryName);
      setCity(data.city);
    });

  useEffect(() => {
    if (session) {
      const email = session?.user?.email || "";

      getUserByEmail(email).then((user) => {
        if (user) {
          console.log("User already exists");

          setPreferences(user.preferences);
          setUserData(user.userData);
        } else {
          console.log("Creating new user");
          
          const newUser = {
            email: session?.user?.email,
            name: session?.user?.name,
            image: session?.user?.image,
            country: country,
            city: city,
            userData,
            preferences,
          };
          createUser(newUser);

          setPreferences(newUser.preferences);
          setUserData(newUser.userData);
        }
      });
    }
  }, [session]);

  return (
    <UserContext.Provider
      value={{
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        image: session?.user?.image || "",
        country: country,
        city: city,
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
