"use client";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { UserProvider } from "./UserProvider";

type Props = {
  children: React.ReactNode;
};

export default function SessionProvider({ children }: Props) {
  return (
    <Provider>
      <UserProvider>{children}</UserProvider>
    </Provider>
  );
}
