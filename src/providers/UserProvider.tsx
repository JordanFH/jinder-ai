"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createDocument, fetchDocumentByCondition } from "@/firebase/utils";
import { updateUserByEmail } from "@/app/(account-pages)/account/page";

type UserPreferences = {
  isFirstTime: boolean;
  explored: {
    jobs: any[];
    courses: any[];
  };
  saved: {
    jobs: any[];
    courses: any[];
  };
};

type UserContextType = {
  name: string;
  email: string;
  image: string;
  country: string;
  city: string;
  preferences: UserPreferences;
  userData: any;
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

  useEffect(() => {
    fetch("https://api.bigdatacloud.net/data/reverse-geocode-client")
      .then((response) => response.json())
      .then((data) => {
        setCountry(data.countryName);
        setCity(data.city);

        if (session) {
          const email = session?.user?.email || "";

          getUserByEmail(email).then((user) => {
            if (user) {
              // console.log("User already exists");

              setCountry(user.country);
              setCity(user.city);
              setPreferences(user.preferences);
              setUserData(user.userData);

              if (user.preferences.isFirstTime) {
                // console.log("First time user");

                const updatedUser = {
                  ...user,
                  preferences: {
                    ...user.preferences,
                    isFirstTime: false,
                  },
                };

                updateUserByEmail(email, updatedUser);
              }
            } else {
              // console.log("Creating new user");

              const newUser = {
                email: session?.user?.email,
                name: session?.user?.name,
                image: session?.user?.image,
                country: data.countryName,
                city: data.city,
                userData,
                preferences,
              };
              createUser(newUser);

              setPreferences(newUser.preferences);
              setUserData(newUser.userData);
            }
          });
        }
      });
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
        userData,
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
